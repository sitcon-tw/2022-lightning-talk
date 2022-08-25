import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {

  const token = useLocalStorage('token')

  async function setupToken(newToken) {
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

  return { config, token, setupToken }
})
