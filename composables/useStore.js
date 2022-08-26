import { defineStore } from 'pinia'
import configJson from '@/config.json'
import dayjs from 'dayjs'

export const useStore = defineStore('main', () => {
  const config = ref(configJson)
  for (const scope in config.value.scopes)
    for (const key in config.value.scopes[scope])
      if (key.endsWith('_time')) {
        const time = dayjs(config.value.scopes[scope][key], 'YYYY-MM-DD HH:mm')
        config.value.scopes[scope][key] = time
        config.value.scopes[scope][key.replace(/^(.*)_time$/, 'is_$1')] = dayjs().isAfter(time)
      }

  function getIsAvailable(scope) {
    return config.value.scopes[scope]?.is_available ?? true
  }
  function getIsExpire(scope) {
    return config.value.scopes[scope]?.is_expire ?? false
  }
  function invisableMessage(scope) {
    if (!getIsAvailable(scope)) return '尚未開放'
    if (getIsExpire(scope)) return '已經結束'
    if (scope === 'rank' && !isVoted.value)
      return { msg: '請先投票', btnText: '前往投票', to: 'vote' }
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
    const res = await fetch(`https://sitcon.opass.app/status?token=${encodeURIComponent(newToken)}`)
      .then((res) => res.json())
    if (res.message) {
      alert(res.message)
      return false
    }
    token.value = newToken
    return true
  }

  function getTimeText(scope) {
    if (!config.value.scopes[scope]) return 'XX:XX - XX:XX'
    const { available_time, expire_time } = config.value.scopes[scope]
    return available_time.format('HH:mm') + ' ~ ' + expire_time.format('HH:mm')
  }

  return {
    config: readonly(config),
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
