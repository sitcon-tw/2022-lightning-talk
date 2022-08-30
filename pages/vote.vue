<script setup>
const store = useStore()

const talks = ref([])
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

const submit = async () => {
  if (!confirm("送出投票後將無法修改，確定送出嗎？"))
    return false
  const votes = Object.entries(vote.value)
    .filter(([, v]) => v > 0)
    .reduce((a, [k, v]) => a.concat(Array(v).fill(k)), [])
  const res = await workerFetch('vote', { votes })
  if (res.vote) store.status.vote = true
  return true
}
</script>

<template>
  <div class="root">
    <non-token-modal />

    <template v-if="!loading && store.canVisit()">
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
        <div class="talk" v-for="talk in talks" :key="talk.uuid" :class="{ active: modelTalk === talk }">
          <h1 class="title">{{  talk.title  }}</h1>
          <hr />
          <vote-counter v-model="vote[talk.uuid]" :disableIncrease="count.remain <= 0" />
          <button class="lookup" @click="modelTalk = talk">查看摘要</button>
        </div>
      </div>
      <hr class="hide-mobile" />
      <div class="footer">
        <div class="remain-text hide-mobile">剩餘票數：{{  count.remain  }}</div>
        <btn class="submit" @click="submit">送出</btn>
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
