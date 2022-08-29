const OPassURL = 'https://sitcon.opass.app'
const SpreadsheetId = ''
const VoteCount = 10
const debug = false

const SheetsSchema = {
  talks: ['uuid', 'time', 'valid', 'token', 'name', 'title', 'description', 'contact'],
  votes: ['time', 'valid', 'token', 'votes.json'],
  rank: ['uuid', 'time', 'count', 'title', 'contact']
}
const dataCols = ['uuid','count','title','description']

const SpreadSheet = SpreadsheetApp.openById(SpreadsheetId)
const Sheets = {}
for(const name in SheetsSchema) {
  const headers = SheetsSchema[name]
  const sheet = SpreadSheet.getSheetByName(name)
  sheet.headers = headers
  sheet.mapping = generateMapping(headers)
  sheet.append = (obj) => sheet.appendRow(toArray(headers)(obj))
  sheet.getAllRange = (cRow = sheet.getLastRow()-1) => sheet.getRange(2,1,cRow,sheet.getLastColumn())
  sheet.getAllData = (validate = true) => {
    const rawData = sheet.getAllRange().getValues().map(toObject(headers))
    if (!headers.some(v => v === 'valid') || !validate) return rawData
    const tokenSet = new Set()
    const data = []
    for(const row of rawData) {
      const { token, valid } = row
      if (!valid || tokenSet.has(token)) continue
      tokenSet.add(token)
      data.push(row)
    }
    return data
  }
  // TODO: race condition :(
  sheet.getRow = (token) => {
    const data = sheet.getAllData(true)
    for(const row of data)
      if (token === row.token)
        return row
    return null
  }
  Sheets[name] = sheet
}

function toObject(headers) {
  return (ary) => {
    const obj = Object.create(null)
    for(let i = 0; i < headers.length; i++) {
      let name = headers[i]
      let data = ary[i]
      if (name === 'time') {
        data = new Date(data)
      }
      if (name.endsWith('.json')) {
        name = name.replace('.json','')
        data = JSON.parse(data)
      }
      obj[name] = data
    }
    return obj
  }
}
function toArray(headers) {
  return (obj) => {
    const ary = Array(headers.length)
    for(let i = 0; i < headers.length; i++) {
      const name = headers[i]
      const key = name.replace('.json','')
      let data = obj[key]
      if (name === 'time') {
        data = data ?? new Date()
      }
      if (name.endsWith('.json'))
        data = JSOn.stringify(data)
      ary[i] = data
    }
    return ary
  }
}
Array.prototype.filterCol = function (dataCols) {
  return this.map(data => {
    const obj = Object.create(null)
    for(const col of dataCols)
      if (col in data)
        obj[col] = data[col]
    return obj
  })
}

function generateMapping(ary) {
  const mapping = new Map()
  for(let i = 0; i < ary.length; i++)
    mapping.set(ary[i], i)
  return mapping
}

function init() {
  throw new Error('TODO')
}

function respJson(resp) {
    return ContentService
      .createTextOutput(JSON.stringify(resp))
      .setMimeType(ContentService.MimeType.JSON)
}
function wrapCache(func, timeout = 60) {
  if (debug) return func
  return (...args) => {
    const cache = CacheService.getScriptCache()
    const cache_key = func.name + Array.from(args).join()
    const cached = cache.get(cache_key)
    if (cached != null) return JSON.parse(cached)

    const ret = func(...args)
    cache.put(cache_key, JSON.stringify(ret), timeout)
    return ret
  }
}

function isValid(token) {
  const url = `${OPassURL}/event/puzzle?token=${encodeURIComponent(token)}`
  const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true })
  const res = JSON.parse(resp.getContentText())
  return !res.message
}
isValid = wrapCache(isValid, 60*60*24)

function saveTalk(data) {
  const { token, name, title, description, contact } = data
  if (!token) return { message: 'Missing token' }
  if (!name) return { message: 'Missing name' }
  if (!title) return { message: 'Missing title' }
  // if (!description) return { message: 'Missing description' }
  if (!contact) return { message: 'Missing contact' }

  const uuid = Utilities.getUuid()
  const valid = isValid(token)
  // const oldRow = valid ? Sheets.talks.getRow(token) : null
  const row = { uuid, valid, token, name, title, description, contact }
  Sheets.talks.append(row)
  if (!valid) return { message: 'Invalid token' }
  // if (oldRow) return { message: 'Token used', uuid: oldRow.uuid }
  return { uuid }
}

function showTalk() {
  const talks = Sheets.talks.getAllData()
  return { talks: talks.filterCol(dataCols) }

}
showTalk = wrapCache(showTalk)

function saveVote(data) {
  const { token, votes } = data
  if (!token) return { message: 'Missing token' }
  if (!votes) return { message: 'Missing votes' }
  if (!votes instanceof Array) return { message: 'Votes not array !?' }

  const valid = isValid(token)
  // const oldRow = valid ? Sheets.votes.getRow(token) : null
  const row = { valid, token, votes }
  Sheets.votes.append(row)
  if (!valid) return { message: 'Invalid token' }
  // if (oldRow) return { message: 'Token used', vote: true }
  if (votes.length > VoteCount) return { message: `You only have ${VoteCount} vote(s).` }
  return { vote: true }
}

function showRank() {
  const votes = Sheets.votes.getAllData().map(row => row.votes).reduce((s,a) => s.concat(a), [])
  const votesMap = new Map()
  for(const uuid of votes) {
    votesMap.set(uuid, (votesMap.get(uuid) ?? 0) + 1)
  }
  const talks = Sheets.talks.getAllData()
  for(const talk of talks)
    talk.count = votesMap.get(talk.uuid) ?? 0
  talks.sort((a, b) => b.count - a.count || a.time.getTime() - b.time.getTime())
  const savedTalks = talks.map(toArray(SheetsSchema.rank))
  Sheets.rank.getAllRange(savedTalks.length).setValues(savedTalks)
  return { talks: talks.filterCol(dataCols) }
}
showRank = wrapCache(showRank)

const actions = {
  'post': saveTalk,
  'talk': showTalk,
  'vote': saveVote,
  'rank': showRank,
}

function getBody({ postData: { type, contents } = {}, parameter }) {
  if (!type) return null
  if (type.startsWith('application/json'))
    return JSON.parse(contents)
  if (type.startsWith('application/x-www-form-urlencoded'))
    return parameter
  throw new Error(`unknown type: ${type}`)
}

function handle(e) {
  const resp = {}
  try {
    const reqData = getBody(e)
    if (reqData?.token) reqData.token = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, reqData.token)
    const { action } = e.parameter
    const res = actions[action](reqData)
    Object.assign(resp, res)
  } catch (e) {
    resp.message = e.message
    if (debug) resp.stack = e.stack
  } finally {
    return respJson(resp)
  }
}

function doGet(e) {
  return handle(e)
}

function doPost(e) {
  return handle(e)
}
