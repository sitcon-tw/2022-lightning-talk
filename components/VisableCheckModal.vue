<script setup>
const props = defineProps({
  title: {
    type: String,
  },
})

const route = useRoute()

const store = useStore()

const message = computed(() => store.invisableMessage(route.name))
const open = computed(() => message.value !== '')
const text = computed(() => typeof message.value === 'string' ? message.value : '')
const msg = computed(() => message.value?.msg)
const to = computed(() => message.value?.to ?? '/')
const btnText = computed(() => message.value?.btnText ?? '返回')
</script>

<template>
  <modal :open="open" disable-close style="z-index: 200">
    <h1>{{ title }} {{ text }}</h1>
    <p>{{ msg }}</p>
    <btn :to="to">{{ btnText }}</btn>
  </modal>
</template>

<style scoped lang="sass">
</style>
