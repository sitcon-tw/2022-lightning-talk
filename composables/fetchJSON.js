export const fetchJSON = async (...args) => {
  if (!process.client) return {}
  const store = useStore()
  store.loading += 1
  const res = await window.fetch(...args).then(res => res.json())
  store.loading -= 1
  return res
}
