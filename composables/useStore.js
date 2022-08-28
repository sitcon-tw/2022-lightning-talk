import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const route = useRoute()

  function getIsAvailable(scope) {
    return config.scopes[scope]?.is_available ?? true
  }
  function getIsExpire(scope) {
    return config.scopes[scope]?.is_expire ?? false
  }

  function invisableMessage(scope = route.name) {
    if (!getIsAvailable(scope)) return '尚未開放'
    if (getIsExpire(scope)) return '已經結束'
    if (scope === 'rank' && !isVoted.value)
      return { msg: '請先投票', btnText: '前往投票', to: '/vote' }
    return ''
  }
  function canVisit(scope) {
    return !invisableMessage(scope)
  }

  const token = useLocalStorage('token', null)
  const isVoted = useLocalStorage('isVoted', false)

  setupToken(token).then((success) => {
    if (!success) token.value = null
  })
  async function setupToken(newToken) {
    newToken = unref(newToken)
    if (!newToken) return false
    const res = await fetch(`${config.opass_url}/status?token=${encodeURIComponent(newToken)}`)
      .then((res) => res.json())
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
    invisableMessage,
    canVisit,
    token: readonly(token),
    isVoted: readonly(isVoted),
    setupToken,
    getTimeText,
  }
})
