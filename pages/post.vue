<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
store.title = '投稿頁面'
const { token } = storeToRefs(store)

const form = ref(null)

const data = ref({
  name: '',
  title: '',
  description: '',
  contact: '',
})

const submit = async () => {
  if (!form.value.reportValidity())
    return false
  const res = await fetch(`${config.worker_url}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: unref(token),
      ...unref(data),
    }),
  }).then(res => res.json())
  if (res.uuid) store.status.post = true
  if (res.message) alert(res.message)
}
</script>

<template>
  <div class="root">
    <non-token-modal  />

    <div class="page">
      <form class="inputs" ref="form" @submit.prevent="submit">
        <span class="text">講者姓名</span>
        <input type="text" v-model="data.name" placeholder="請輸入姓名..." required />

        <span class="text">議題</span>
        <input type="text" v-model="data.title" placeholder="請輸入議題..." required />

        <span class="text">摘要</span>
        <textarea v-model="data.description" placeholder="請輸入摘要..." required></textarea>

        <span class="text">聯絡方式</span>
        <input type="text" v-model="data.contact" placeholder="請輸入聯絡方式..." required />
      </form>
      <btn class="submit" @click="submit">送出</btn>
    </div>
  </div>
</template>

<style scoped lang="sass">
.inputs
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  gap: 16px
.text
  font-size: 14px
  font-weight: 500
input, textarea
  width: 100%
  height: 50px
  border-radius: 5px
  padding: 0 16px
  font-size: 16px
  font-weight: 500
  color: #383838
  background: #EBE1CC
  &:focus
    outline: 1px solid #82D357
  &:required:invalid
    outline: 1px solid #FF5252
textarea
  flex: 1
  padding-top: 16px
  resize: none
</style>
