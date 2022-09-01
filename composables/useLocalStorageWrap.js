export const useLocalStorageWrap = (...args) => {
    if (!process.client) return ref(args[1] ?? {})
    return useLocalStorage(...args)
}
