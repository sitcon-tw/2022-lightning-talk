<script setup>
const store = useStore()

const form = ref(null)
const loading = ref(false)
const firstSubmit = ref(false)
const data = ref({
  name: '',
  title: '',
  description: '',
  contact: '',
})

const submit = async () => {
  firstSubmit.value = true
  if (!form.value.reportValidity())
    return false
  if (!confirm("送出投稿後將無法修改，確定送出嗎？"))
    return false
  loading.value = true
  const res = await workerFetch('post', data)
  loading.value = false
  if (res.uuid) {
    store.status.post = true
  }
}
</script>

<template>
  <div class="root">
    <non-token-modal />

    <div class="page">
      <form class="inputs" :class="{ firstSubmit }" ref="form" @submit.prevent="submit">
        <span class="text">講者姓名</span>
        <input type="text" v-model="data.name" placeholder="請輸入姓名…" required :disabled="loading" />

        <span class="text">議題</span>
        <input type="text" v-model="data.title" placeholder="請輸入議題…" required :disabled="loading" />

        <span class="text">摘要</span>
        <textarea v-model="data.description" placeholder="請輸入摘要…" required :disabled="loading" />

        <span class="text">聯絡方式</span>
        <input type="text" v-model="data.contact" placeholder="請輸入聯絡方式…" required :disabled="loading" />
      </form>
      <btn class="submit" @click="submit" :disabled="loading">{{  loading ? '正在投稿' : '送出'  }}</btn>
    </div>
  </div>
</template>

<style scoped lang="sass">
.page
  position: relative
  margin: 0 -20px
  margin-top: -24px
  padding: 0 20px
  padding-top: 24px
  @media screen and (min-width: 769px)
    max-height: 900px
    padding-right: 50%
    align-items: flex-end
    background-image: url(~/assets/img/cat-post.svg)
    background-repeat: no-repeat
    background-size: auto 200%
    background-position: calc(50% + 300px) bottom
    &::before
      content: '感謝您的投稿！'
      font-size: 24px
      font-weight: 700
      letter-spacing: 5px
      position: absolute
      bottom: calc(50% + 80px)
      left: calc(50% + 320px)
      transform: rotate(-25deg)
.inputs
  height: 100%
  max-height: 700px
  display: flex
  flex-direction: column
  justify-content: space-between
  gap: 16px
  @media screen and (min-width: 769px)
    width: 100%
    max-width: 445px
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
  .firstSubmit &:required:invalid
    outline: 1px solid #FF5252
  &:disabled,&[disabled]
    background: #EBE1CC
    color: #9D9D9D
.text + *:is(input, textarea)
  margin-top: -24px
  @media screen and (max-width: 768px)
    margin-top: -12px
textarea
  flex: 1
  max-height: 300px
  padding-top: 16px
  resize: none
</style>
