const OPassURL = ''
const SpreadsheetId = ''

const SheetsSchema = {
  talks: ['uuid', 'time', 'isValid', 'token', 'name', 'title', 'description', 'contact'],
  votes: ['time', 'isValid', 'token', 'votes'],
  rank: ['uuid', 'title', 'contact']
}

const SpreadSheet = SpreadsheetApp.openById(SpreadsheetId)
const Sheets = {}
const RevSheets = new Map()
for(const name in SheetsSchema) {
  Sheets[name] = SpreadSheet.getSheetByName(name)
  RevSheets.set(Sheets[name], name)
  Sheets[name].headers = SheetsSchema[name]
  Sheets[name].mapping = generateMapping(Sheets[name].headers)
}

function generateMapping(ary) {
  const mapping = new Map()
  for(let i = 0; i < ary.length; i++)
    mapping.set(ary[i], i)
  return mapping
}
function getHeaders(sheet) {
  return Sheets[RevSheets.get(sheet)].headers
}
function getHeadersMapping(sheet) {
  return Sheets[RevSheets.get(sheet)].mapping
}
function getAllData(sheet) {
  return sheet.getSheetValues(2,1,sheet.getLastRow()-1,sheet.getLastColumn())
}

function init() {
  // SpreadSheet.insertSheet()
}

function respJson(resp) {
    return ContentService
      .createTextOutput(JSON.stringify(resp))
      .setMimeType(ContentService.MimeType.JSON)
}
function wrapCache(func) {
  return func
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

// TODO: race condition :(
function isUsed(sheet, token) {
  const tokenCol = getHeadersMapping(sheet).get('token')
  const data = sheet.getSheetValues(2, tokenCol+1, sheet.getLastRow(), 1)
  for(const row of data)
    if (token === row[0])
      return true
  return false
}

function saveTalk(data) {
  const { token, name, title, description, contact } = data
  if (!token) return { message: 'Missing token' }
  if (!name) return { message: 'Missing name' }
  if (!title) return { message: 'Missing title' }
  // if (!description) return { message: 'Missing description' }
  if (!contact) return { message: 'Missing contact' }

  const uuid = Utilities.getUuid()
  const valid = isValid(token)
  const firstUsed = valid ? !isUsed(Sheets.talks, token) : null
  const row = [
    uuid,
    new Date().toLocaleString(),
    valid,
    token, name, title, description, contact
  ]
  Sheets.talks.appendRow(row)
  if (!valid) return { message: 'Invalid token' }
  if (!firstUsed) return { message: 'Token used' }
  return { uuid }
}

function getValidTalks() {
  const tokenSet = new Set()
  const { mapping, headers } = Sheets.talks
  const tokenCol = mapping.get('token')
  const rawData = getAllData(Sheets.talks)
  const talks = []
  for(const data of rawData) {
    const token = data[tokenCol]
    if (!isValid(token) || tokenSet.has(token)) continue
    tokenSet.add(token)
    const talk = Object.create(null)
    for(let i = 0; i < headers.length; i++)
      talk[ headers[i] ] = data[i]
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
  throw new Error('TODO')
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
    resp.stack = e.stack
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
