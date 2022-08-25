<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  title: {
    type: String,
  },
})

const route = useRoute()

const store = useStore()
const scope = computed(() => store.config.scopes[route.name])

const available_time = computed(() => scope.value?.available_time)
const expire_time = computed(() => scope.value?.expire_time)

const isAvailable = computed(() => !available_time.value ? true : dayjs().isAfter(available_time.value))
const isExpire = computed(() => !expire_time.value ? false : dayjs().isAfter(expire_time.value))

const open = computed(() => !isAvailable.value || isExpire.value)
</script>

<template>
  <modal v-model="open" disable-close>
    <h1>{{ title }} {{ !isAvailable ? '尚未開放' : '已經結束' }}</h1>
    <btn to="/">返回</btn>
  </modal>
</template>

<style scoped lang="sass">
.btn
  width: 50%
  margin: 0 auto
</style>
