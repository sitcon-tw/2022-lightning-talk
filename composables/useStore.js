import { defineStore } from 'pinia'
import configJson from '@/config.json'
import dayjs from 'dayjs'

export const useStore = defineStore('main', () => {
  const config = ref(configJson)
  for (const scope in config.value.scopes)
    for (const key in config.value.scopes[scope])
      if (key.endsWith('_time'))
        config.value.scopes[scope][key] = dayjs(config.value.scopes[scope][key], 'YYYY-MM-DD HH:mm')

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

  function getTimeText(scope) {
    if (!config.value.scopes[scope]) return 'XX:XX - XX:XX'
    const { available_time, expire_time } = config.value.scopes[scope]
    return available_time.format('HH:mm') + ' ~ ' + expire_time.format('HH:mm')
  }

  return { config, token, setupToken, getTimeText }
})
