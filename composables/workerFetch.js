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
  const { data: res } = await useFetch(`${config.worker_url}/${action}`, opt)
  if (res.message) alert(res.message)
  return res
}
