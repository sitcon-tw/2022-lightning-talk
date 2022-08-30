<script setup>
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

const store = useStore()
const { title, talks, invisable } = storeToRefs(store)

const loading = ref(false)
const hide = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}

const open = computed(() => !loading.value && invisable.value !== null)
const icon = computed(() => invisable.value.icon || `bx bxs-info-circle`)
const text = computed(() => invisable.value.msg ?? title)
const to = computed(() => invisable.value.to ?? '/')
const btnText = computed(() => invisable.value.btnText ?? '返回')

function sumArray(arr) {
  return Object.entries(arr.reduce((o,v) => (o[v] = (o[v] ?? 0) + 1, o), {})).sort((a,b) => b[1] - a[1])
}
</script>

<template>
  <modal :open="open" disable-close style="z-index: 200">
    <h1 style="margin-bottom: 0"><i :class='icon' style="font-size: 64px;"></i></h1>
    <h1 style="margin-top: 0;font-size: 32px;">{{  text  }}</h1>
    <div class="detail">
      <template v-if="invisable.post">
        <p>
          您已於 {{ dayjs(invisable.post.time).format('YYYY-MM-DD HH:mm:ss') }}
          投稿 「{{ invisable.post.title }}」
        </p>
      </template>
      <template v-if="invisable.vote">
        <p>
          您已於 {{ dayjs(invisable.vote.time).format('YYYY-MM-DD HH:mm:ss') }} 投給以下稿件
        </p>
        <ul>
          <li v-for="([uuid, count]) of sumArray(invisable.vote.votes)">
            {{ count }} 票「{{ talks.filter(v => v.uuid === uuid)[0]?.title ?? uuid }}」
          </li>
        </ul>
      </template>
    </div>
    <btn :to="to" @click="hide">{{  btnText  }}</btn>
  </modal>
</template>

<style scoped lang="sass">
.detail
  p
    margin-top: 0
</style>
