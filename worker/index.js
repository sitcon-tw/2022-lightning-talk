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

function add_cors_headers(req, res) {
  res.headers.set('Access-Control-Allow-Origin', req.headers.get('Origin'))
  res.headers.set('Access-Control-Allow-Headers', req.headers.get('Access-Control-Request-Headers'))
  res.headers.set('Access-Control-Allow-Methods', req.headers.get('Access-Control-Request-Method'))
  return res
}

function check_action(action) {
  if (!action) return badRequest('action is required')
  if (!config.actions.some(v => v === action)) return badRequest('action is invalid')
  return true
}

function requestData(action, body = null) {
  const res = check_action(action)
  if (res !== true) return res
  const opt = {}
  if (body) {
    opt.method = 'POST'
    opt.body = JSON.stringify(body)
    if (!opt.headers) opt.headers = {}
    opt.headers['Content-Type'] = 'application/json'
  }
  return fetch(`${config.server_url}?action=${encodeURIComponent(action)}`, opt)
    .then(res => res.json())
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

router.options('/:action', async (request) => {
  const action = request.params.action
  const res = check_action(action)
  if (res !== true) return res
  return responseJson({})
})

router.all('*', () => badRequest('404, not found!', 404))

addEventListener('fetch', (e) => {
  const resp = router.handle(e.request)
    .then(res => add_cors_headers(e.request, res))
    .catch(e => {
      console.error(e)
      return responseJson({ message: 'Internal Server Error' }, 500)
    })
  e.respondWith(resp)
})
