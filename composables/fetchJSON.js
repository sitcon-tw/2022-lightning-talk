export const fetchJSON = async (...args) => {
  if (!process.client) return {}
  const store = useStore()
  store.loading += 1

  let res = await window.fetch(...args).then(async response => {
    store.loading -= 1
    if (response.ok) {
      return (await res.json())
    } else if (response.status == 403) {
      return {
        message: `請使用會場提供的 Wi-Fi`,
      }
    } else {
      console.error(response)
      return {
        message: `發生錯誤，請稍後再試`,
      }
    }
  })
}
