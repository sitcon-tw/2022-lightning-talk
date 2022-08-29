import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const route = useRoute()

  function getIsAvailable(scope) {
    return config.scopes[scope]?.is_available ?? true
  }
  function getIsExpire(scope) {
    return config.scopes[scope]?.is_expire ?? false
  }
  function getRequired(scope) {
    return config.scopes[scope]?.required ?? []
  }

  const title = computed(() => config.scopes[route.name]?.title ?? 'Unknown')

  function invisableMessage(scope = route.name) {
    if (scope === 'index') return ''
    if (!getIsAvailable(scope)) return '尚未開放'
    if (getIsExpire(scope)) return '已經結束'
    if (status.value[scope]) return '已經完成'
    for (const req of getRequired(scope)) {
      if (!getIsExpire(req) && !status.value[req]) {
        const name = config.scopes[req]?.name ?? req
        return { msg: `尚未完成${name}`, btnText: `前往${name}`, to: `/${req}` }
      }
    }
    return ''
  }
  function canVisit(scope = route.name) {
    return !invisableMessage(scope)
  }

  const token = useLocalStorage('token', null)
  const status = useLocalStorage('status', {})

  setupToken(route.query.token ?? token)
    .then((success) => !success && (token.value = null))
  async function setupToken(newToken) {
    newToken = unref(newToken)
    if (!newToken) return false
    const res = await fetchJSON(`${config.opass_url}/status?token=${encodeURIComponent(newToken)}`)
    if (res.message) {
      alert(res.message)
      return false
    }
    token.value = newToken
    return true
  }

  function getTimeText(scope) {
    if (!config.scopes[scope]) return 'XX:XX - XX:XX'
    const { available_time, expire_time } = config.scopes[scope]
    return available_time.format('HH:mm') + ' ~ ' + expire_time.format('HH:mm')
  }

  return {
    getIsAvailable,
    getIsExpire,
    getRequired,
    title,
    invisableMessage,
    canVisit,
    token: readonly(token),
    status,
    setupToken,
    getTimeText,
  }
})
