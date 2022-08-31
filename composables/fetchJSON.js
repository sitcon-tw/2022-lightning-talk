export const fetchJSON = async (...args) => {
  if (!process.client) return {}
  const store = useStore()
  store.loading += 1
  try {
    const res = await window.fetch(...args).then((res) => res.json())
    return res
  } catch (err) {
    console.error(err)
    return {
      message: `Error: ${err.message}\nContact the developer if this problem persists.\n\nDebug Info:\n${err.stack}`,
    }
  } finally {
    store.loading -= 1
  }
}
