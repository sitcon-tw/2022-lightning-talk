<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
const { talks } = storeToRefs(store)
const shuffledTalks = computed(() => shuffle(talks.value))

const loading = ref(true)
workerFetch('talk')
  .then(res => {
    talks.value = res.talks
    loading.value = false
  })
const modelTalk = ref()

const vote = ref(Object.create(null))
watch(talks, () => {
  vote.value = Object.create(null)
  for (const talk of talks.value)
    vote.value[talk.uuid] = 0
})

const count = ref({
  total: config.vote_count,
  get current() {
    return Object.values(vote.value).reduce((a, b) => a + b, 0)
  },
  get remain() {
    return this.total - this.current
  }
})

const watiSubmit = ref(false)
const submit = async () => {
  if (!confirm("送出投票後將無法修改，確定送出嗎？"))
    return false
  const votes = Object.entries(vote.value)
    .filter(([, v]) => v > 0)
    .reduce((a, [k, v]) => a.concat(Array(v).fill(k)), [])
  watiSubmit.value = true
  const { row } = await workerFetch('vote', { votes })
  watiSubmit.value = false
  if (row) {
    store.status.vote = row
  }
  return true
}
</script>

<template>
  <div class="root">
    <non-token-modal />

    <template v-if="!loading && store.canView()">
      <Teleport to="#title">
        <div class="remain-text hide-desktop">剩餘票數：{{  count.remain  }}</div>
      </Teleport>
    </template>

    <div class="status-text" v-if="loading">
      <Loader />
    </div>
    <div class="status-text" v-else-if="!talks || !talks.length">尚無稿件!?</div>
    <div class="page has-talk-modal" v-else>
      <div class="talks">
        <div class="talk" v-for="talk in shuffledTalks" :key="talk.uuid" :class="{ active: modelTalk === talk }">
          <h1 class="title">{{  talk.title  }}</h1>
          <hr />
          <vote-counter v-model="vote[talk.uuid]" :max="vote[talk.uuid] + count.remain" :disabled="watiSubmit" />
          <button class="lookup" @click="modelTalk = talk">查看摘要</button>
        </div>
      </div>
      <hr class="hide-mobile" />
      <div class="footer">
        <div class="remain-text hide-mobile">剩餘票數：{{ count.remain }}</div>
        <btn class="submit" @click="submit" v-if="!watiSubmit"> 送出 </btn>
        <btn class="submit disabled" v-else disabled>
          <loader />
        </btn>
      </div>
    </div>
    <talk-modal v-model:talk="modelTalk" v-model:vote="vote[modelTalk?.uuid]" :count="count" />
  </div>
</template>

<style scoped lang="sass">
.root
  padding-top: 24px
.remain-text
  color: #383838
  font-size: 14px
  font-weight: 400

.talks
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

.talk
  .title
    font-size: 24px
    font-weight: 900
    margin: 8px 16px

.footer
  display: flex
  justify-content: space-between
  align-items: center
  @media screen and (min-width: 769px)
    margin-top: 16px
    margin-bottom: 56px
  .remain-text
    font-size: 20px
    font-weight: 500
  .btn
    @media screen and (max-width: 768px)
      flex: 1
</style>
