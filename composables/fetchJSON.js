export const fetchJSON = async (...args) => {
  if (!process.client) return {}
  const store = useStore()
  store.loading += 1
  try {
    const res = await window.fetch(...args).then((res) => res.json())
    return res
  } catch (err) {
    console.error(err)
    return err
  } finally {
    store.loading -= 1
  }
}
