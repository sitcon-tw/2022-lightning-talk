import QrcodeReaderVue3 from "qrcode-reader-vue3"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(QrcodeReaderVue3)
})
