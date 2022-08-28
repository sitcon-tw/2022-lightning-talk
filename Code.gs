const OPassURL = ''
const SpreadsheetId = ''
const VoteCount = 10
const debug = false

const SheetsSchema = {
  talks: ['uuid', 'time', 'isValid', 'token', 'name', 'title', 'description', 'contact'],
  votes: ['time', 'isValid', 'token', 'votes.json'],
  rank: ['uuid', 'title', 'contact']
}

const SpreadSheet = SpreadsheetApp.openById(SpreadsheetId)
const Sheets = {}
for(const name in SheetsSchema) {
  const headers = SheetsSchema[name]
  const sheet = SpreadSheet.getSheetByName(name)
  sheet.headers = headers
  sheet.mapping = generateMapping(headers)
  sheet.getAllData = () => {
    return sheet.getSheetValues(2,1,sheet.getLastRow()-1,sheet.getLastColumn())
      .map(ary => {
        const obj = Object.create(null)
        for(let i = 0; i < headers.length; i++) {
          let name = headers[i]
          let data = ary[i]
          if (name.endsWith('.json')) {
            name = name.replace('.json','')
            data = JSON.parse(data)
          }
          obj[name] = data
        }
        return obj
      })
  }
  // TODO: race condition :(
  sheet.getRow = (token) => {
    const data = sheet.getAllData()
    for(const row of data)
      if (token === row.token)
        return row
    return null
  }
  Sheets[name] = sheet
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
function wrapCache(func) {
  if (debug) return func
  return (...args) => {
    const cache = CacheService.getScriptCache()
    const cache_key = func.name + Array.from(args).join()
    const cached = cache.get(cache_key)
    if (cached != null) return JSON.parse(cached)

    const ret = func(...args)
    cache.put(cache_key, JSON.stringify(ret), 60)
    return ret
  }
}

function isValid(token) {
  const url = `${OPassURL}/status?token=${encodeURIComponent(token)}`
  const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true })
  const res = JSON.parse(resp.getContentText())
  return !res.message
}
isValid = wrapCache(isValid)

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
  const row = [
    uuid,
    new Date().toLocaleString(),
    valid,
    token, name, title, description, contact
  ]
  Sheets.talks.appendRow(row)
  if (!valid) return { message: 'Invalid token' }
  // if (oldRow) return { message: 'Token used', uuid: oldRow.uuid }
  return { uuid }
}

function getValidTalks() {
  const tokenSet = new Set()
  const data = Sheets.talks.getAllData()
  const talks = []
  for(const talk of data) {
    const { token, isValid } = talk
    if (!isValid || tokenSet.has(token)) continue
    tokenSet.add(token)
    talks.push(talk)
  }
  return talks
}
getValidTalks = wrapCache(getValidTalks)

function showTalk() {
  const dataCols = ['uuid','title','description']
  const talks = getValidTalks().map(data => {
    const talk = Object.create(null)
    for(const col of dataCols)
      talk[col] = data[col]
    return talk
  })
  return { talks }

}
showTalk = wrapCache(showTalk)

function saveVote(data) {
  const { token, votes } = data
  if (!token) return { message: 'Missing token' }
  if (!votes) return { message: 'Missing votes' }
  if (!votes instanceof Array) return { message: 'Votes not array !?' }

  const valid = isValid(token)
  // const oldRow = valid ? Sheets.votes.getRow(token) : null
  const row = [
    new Date().toLocaleString(),
    valid,
    token, JSON.stringify(votes)
  ]
  Sheets.votes.appendRow(row)
  if (!valid) return { message: 'Invalid token' }
  // if (oldRow) return { message: 'Token used', vote: true }
  if (votes.length > VoteCount) return { message: `You only have ${VoteCount} vote(s).` }
  return { vote: true }
}

function showRank() {
  throw new Error('TODO')
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
