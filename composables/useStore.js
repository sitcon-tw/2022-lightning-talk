import { defineStore } from 'pinia'
import config from '@/config.json'
import dayjs from 'dayjs'

export const useStore = defineStore('main', () => {

  const token = useLocalStorage('token', null)

  setupToken(token).then(success => {
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

  function time2text(time) {
    return dayjs(time, 'YYYY-MM-DD HH:mm').format('HH:mm')
  }

  function getTimeText(scope) {
    if (!(scope in config.scopes)) return 'XX:XX - XX:XX'
    const { available_time, expire_time } = config.scopes[scope]
    return time2text(available_time) + ' ~ ' + time2text(expire_time)
  }

  return { config, token, setupToken, getTimeText }
})
