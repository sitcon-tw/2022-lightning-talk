export const fetchJSON = (...args) => {
  if (!process.client) return {}
  return window.fetch(...args).then(res => res.json())
}
