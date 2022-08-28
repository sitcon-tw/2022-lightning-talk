<script setup>
import ordinal from 'ordinal'

const store = useStore()

const talks = ref([])
const loading = ref(true)
workerFetch('rank')
  .then(res => {
    talks.value = res.talks
    loading.value = false
  })
const modelTalk = ref()

const addComma = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
</script>

<template>
  <div class="root">
    <div class="status-text" v-if="loading">結果載入中...</div>
    <div class="status-text" v-else-if="!talks || !talks.length">尚無稿件!?</div>
    <div class="page" v-else>
      <div class="talks">
        <div class="talk" v-for="(talk, rank) in talks" :key="talk.uuid">
          <div class="rank-bg">
            <div class="rank">{{ ordinal(rank + 1) }}</div>
          </div>
          <div class="vote">
            <span class="number">{{ addComma(talk.count) }}</span>
            票
          </div>
          <hr />
          <div class="text">議程名稱</div>
          <h1 class="title">{{ talk.title }}</h1>
          <button class="lookup" @click="modelTalk = talk">查看摘要</button>
        </div>
      </div>
    </div>
    <talk-modal v-model:talk="modelTalk" />
  </div>
</template>

<style scoped lang="sass">
.talk
  padding: 0px 26px 16px 26px

  .rank-bg
    position: absolute
    top: 0
    right: 0
    transform: translate(50%, -50%)
    width: 128px
    height: 128px
    font-weight: 500
    background: #82D357
    border-radius: 50%
  .rank
    position: absolute
    bottom: 24px
    left: calc(50% - 44px)
    font-size: 20px
    color: #FFFFFF

  .vote
    display: inline-block
    align-self: flex-start
    width: 80%
    text-align: end
    font-size: 32px
    font-weight: 500
    .number
      font-size: 64px
      font-weight: 700
      color: #82D357
      -webkit-text-stroke: 1px

  hr
    margin-bottom: 10px

  .text
    font-size: 12px
    font-weight: 700
  .title
    font-size: 14px
    font-weight: 400
    margin: 0

  .lookup
    border-radius: 10px
</style>
