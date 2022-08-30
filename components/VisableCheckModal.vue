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
const icon = computed(() => message?.icon || `bx bxs-info-circle`)
const text = computed(() => typeof message.value === 'string' ? message.value : message.value?.msg ?? title)
const to = computed(() => message.value?.to ?? '/')
const btnText = computed(() => message.value?.btnText ?? '返回')
</script>

<template>
  <modal :open="open" disable-close style="z-index: 200">
    <h1 style="margin-bottom: 0"><i :class='icon' style="font-size: 64px;"></i></h1>
    <h1 style="margin-top: 0;font-size: 32px;">{{  text  }}</h1>
    <btn :to="to" @click="hide">{{  btnText  }}</btn>
  </modal>
</template>

<style scoped lang="sass">
</style>
