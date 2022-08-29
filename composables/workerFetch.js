export const workerFetch = async (action, body) => {
  const store = useStore()
  body = unref(body)
  const opt = !body ? {} : {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        token: store.token,
        ...unref(body),
    })
  }
  if (!process.client) return {}
  const res = await fetch(`${config.worker_url}/${action}`, opt).then(res => res.json())
  if (res.message) alert(res.message)
  return res
}
