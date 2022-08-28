<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
const { title } = storeToRefs(store)

const loading = ref(false)
const hide = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}

const message = computed(() => store.invisableMessage())
const open = computed(() => !loading.value && message.value !== '')
const text = computed(() => typeof message.value === 'string' ? message.value : '')
const msg = computed(() => message.value?.msg)
const to = computed(() => message.value?.to ?? '/')
const btnText = computed(() => message.value?.btnText ?? '返回')
</script>

<template>
  <modal :open="open" disable-close style="z-index: 200">
    <h1>{{ title }} {{ text }}</h1>
    <p>{{ msg }}</p>
    <btn :to="to" @click="hide">{{ btnText }}</btn>
  </modal>
</template>

<style scoped lang="sass">
</style>
