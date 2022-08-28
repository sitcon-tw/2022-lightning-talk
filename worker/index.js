import { Router } from 'itty-router'
import config from './config.json'

const router = Router()

function responseJson(returnData, opt = {}) {
  if (!opt.headers) opt.headers = {}
  opt.headers['Content-Type'] = 'application/json'
  return new Response(JSON.stringify(returnData), opt)
}
function badRequest(message = 'Bad Request', status = 400) {
  return responseJson({ message }, { status })
}

function requestData(action, body = null) {
  if (!config.actions.some(v => v === action))
    return badRequest(`Action '${action}' is not allowed.`)
  const opt = {}
  if (body) {
    opt.method = 'POST'
    opt.body = JSON.stringify(body)
    if (!opt.headers) opt.headers = {}
    opt.headers['Content-Type'] = 'application/json'
  }
  return fetch(`${config.server_url}?action=${encodeURIComponent(action)}`, opt).then(res => res.json())
}

router.get('/:action', async (request) => {
  const action = request.params.action
  const returnData = await requestData(action)
  if (returnData instanceof Response) return returnData
  return responseJson(returnData)
})

router.post('/:action', async (request) => {
  if (!request.headers.get('Content-Type').startsWith('application/json'))
    return badRequest('Content-Type must be application/json')
  const action = request.params.action
  const body = await request.json()
  const returnData = await requestData(action, body)
  if (returnData instanceof Response) return returnData
  return responseJson(returnData)
})

router.all('*', () => badRequest('404, not found!', 404))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
