<script setup>
const store = useStore()

const form = ref(null)
const watiSubmit = ref(false)
const firstSubmit = ref(false)
const data = ref({
  name: '',
  title: '',
  description: '',
  contact: '',
})

const refTitle = ref()
const refDescription = ref()

const submit = async () => {
  firstSubmit.value = true
  if (!form.value.reportValidity())
    return false
  if (countWords(data.value.title) > config.limit.title) {
    refTitle.value.classList.add('invalid')
    alert(`議題名稱不可超過 ${config.limit.title} 個字`)
    return false
  } else {
    refTitle.value.classList.remove('invalid')
  }
  if (countWords(data.value.description) > config.limit.description) {
    refDescription.value.classList.add('invalid')
    alert(`議題摘要不可超過 ${config.limit.description} 個字`)
    return false
  } else {
    refDescription.value.classList.remove('invalid')
  }
  if (!confirm("送出投稿後將無法修改，確定送出嗎？"))
    return false
  watiSubmit.value = true
  const { row } = await workerFetch('post', data)
  watiSubmit.value = false
  if (row) {
    store.status.post = row
  }
}
</script>

<template>
  <div class="root">
    <non-token-modal />

    <div class="page">
      <form class="inputs" :class="{ firstSubmit }" ref="form" @submit.prevent="submit">
        <span class="text">講者姓名</span>
        <input type="text" v-model="data.name" placeholder="請輸入姓名…" required :disabled="watiSubmit" />

        <span class="text">議題</span>
        <input type="text" ref="refTitle" v-model="data.title" placeholder="請輸入議題…" required :disabled="watiSubmit" />

        <span class="text">摘要</span>
        <textarea ref="refDescription" v-model="data.description" placeholder="請輸入摘要…" required :disabled="watiSubmit" />

        <span class="text">聯絡方式</span>
        <input type="text" v-model="data.contact" placeholder="請輸入聯絡方式…" required :disabled="watiSubmit" />
      </form>
      <btn class="submit" @click="submit" v-if="!watiSubmit"> 送出 </btn>
      <btn class="submit disabled" v-else disabled>
        <loader />
      </btn>
    </div>
  </div>
</template>

<style scoped lang="sass">
.page
  position: relative
  margin: 0 -20px
  padding: 24px
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
  display: flex
  flex-direction: column
  @media screen and (min-width: 769px)
    width: 100%
    max-width: 445px
.text
  font-size: 14px
  font-weight: 500
  margin-bottom: 8px
input, textarea
  width: 100%
  height: 50px
  border-radius: 5px
  padding: 0 16px
  font-size: 16px
  font-weight: 500
  color: #383838
  background: #EBE1CC
  margin-bottom: 24px
  &:focus
    outline: 1px solid #82D357
  .firstSubmit &:required:invalid, &.invalid
    outline: 1px solid #FF5252
  &:disabled,&[disabled]
    background: #EBE1CC
    color: #9D9D9D
textarea
  height: 200px
  padding-top: 16px
  resize: none
</style>
