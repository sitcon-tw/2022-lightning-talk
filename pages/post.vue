<script setup>
useHead({
  title: '投稿頁面',
})

const name = ref('')
const title = ref('')
const abstract = ref('')
const contact = ref('')

const submit = () => {
  const data = {
    name: name.value,
    title: title.value,
    abstract: abstract.value,
    contact: contact.value,
  }
  console.log(data)
}
</script>

<template>
  <div class="form">
    <span class="text">講者姓名</span>
    <input v-model="name" type="text" placeholder="請輸入姓名..." />

    <span class="text">議題</span>
    <input v-model="title" type="text" placeholder="請輸入議題..." />

    <span class="text">摘要</span>
    <textarea v-model="abstract" placeholder="請輸入摘要..."></textarea>

    <span class="text">聯絡方式</span>
    <input v-model="contact" type="text" placeholder="請輸入聯絡方式..." />

    <btn @click="submit">送出</btn>
  </div>
</template>

<style scoped lang="sass">
.form
  height: 100%
  padding-bottom: 16px
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
  border: none
  border-radius: 5px
  padding: 0 16px
  font-size: 14px
  font-weight: 500
  color: #383838
  background: #EBE1CC
  &:focus
    outline: 1px solid #82D357
textarea
  flex: auto
  padding-top: 16px
</style>
