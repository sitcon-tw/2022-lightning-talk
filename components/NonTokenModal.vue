<script setup>
import { storeToRefs } from 'pinia'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const store = useStore()
const { token } = storeToRefs(store)
const open = computed({
  get() {
    return !token.value
  },
  set(value) {
    if (!value) navigateTo('/')
  },
})

const inputToken = ref('')
const manualInputModal = ref(false)
const submit = () => {
  manualInputModal.value = false
  store.setupToken(inputToken.value)
}
const scanQRCodeModal = ref(false)
const onDecode = (token) => {
  scanQRCodeModal.value = false
  store.setupToken(token)
}

const qrcodestream = ref()
onMounted(async () => {
  const { QrcodeStream } = await import("qrcode-reader-vue3")
  qrcodestream.value = QrcodeStream
})
</script>

<template>
  <div class="non-token-modal">
    <modal v-model:open="open">
      <h2 class="title">尚未登入或未完成報到</h2>
      <p class="text">請檢查 OPass 是否已成功報到，或透過下列方式進入遊戲。</p>
      <div class="select-items">
        <div class="select-item" @click="manualInputModal = true">
          <div class="icon">
            <i class="bx bxs-keyboard"></i>
          </div>
          <div class="content">手動輸入票券代碼</div>
        </div>
        <div class="select-item" @click="scanQRCodeModal = true">
          <div class="icon">
            <i class="bx bx-qr-scan"></i>
          </div>
          <div class="content">掃描票券 QR Code</div>
        </div>
      </div>
    </modal>

    <modal v-model:open="manualInputModal">
      <h2 class="title">手動輸入票券代碼</h2>
      <p class="text">請輸入 OPass 票券代碼。</p>
      <input type="text" v-model="inputToken" placeholder="請輸入票券代碼..." autofocus @keyup.enter="submit" />
      <btn class="submit" @click="submit">送出</btn>
    </modal>

    <modal v-model:open="scanQRCodeModal">
      <h2 class="title">掃描票券 QR Code</h2>
      <p class="text">請開啟 OPass 中的我的票券，並掃描其中的 QR Code。</p>
      <component :is="qrcodestream" class="qrstream" @decode="onDecode">
      </component>
    </modal>
  </div>
</template>

<style scoped lang="sass">
.non-token-modal
  position: absolute

.select-items
  display: flex
  gap: 16px
.select-item
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 16px
  border-radius: 5px
  cursor: pointer
  border: 1px solid #e6e6e6
  box-shadow: 0px 0px 10px rgba(0,0,0,.1)
  &:hover
    background: #f5f5f5
  .icon
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    font-size: 24px
  .content
    padding: 0 16px

input
  width: 100%
  height: 50px
  border-radius: 5px
  padding: 0 16px
  font-size: 16px
  font-weight: 500
  color: #333
  border: 1px solid #e6e6e6
  box-shadow: 0px 0px 10px rgba(0,0,0,.1)
  &:hover
    border-color: #ccc

.btn
  margin-top: 16px

.qrstream
  overflow: hidden
</style>
