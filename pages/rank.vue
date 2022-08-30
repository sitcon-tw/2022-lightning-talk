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
        <div class="talk" v-for="(talk, rank) in talks" :key="talk.uuid"
          @click="modelTalk = talk" :class="{ active: modelTalk === talk }">
          <div class="rank-bg">
            <div class="rank">{{  ordinal(rank + 1)  }}</div>
          </div>
          <div class="vote">
            <span class="number">{{  addComma(talk.count)  }}</span>
            票
          </div>
          <hr />
          <div class="text hide-desktop">議程名稱</div>
          <h1 class="title">{{  talk.title  }}</h1>
          <button class="lookup">查看摘要</button>
        </div>
      </div>
    </div>
    <talk-modal v-model:talk="modelTalk" />
  </div>
</template>

<style scoped lang="sass">
.talks
  padding: 16px 8px
  padding-top: 0
  margin: 0 -8px
.talk
  padding: 0px 26px 16px 26px
  cursor: pointer
  @media screen and (min-width: 769px)
    flex-direction: row
    align-items: center
    font-size: 64px

  @media screen and (max-width: 768px)
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
  @media screen and (min-width: 769px)
    .rank-bg
      width: 150px
      font-size: 60px
      font-weight: 700
      color: #D9D9D9
    &:nth-of-type(1) .rank-bg
      color: #FFBE76
    &:nth-of-type(2) .rank-bg
      color: #9D9D9D
    &:nth-of-type(3) .rank-bg
      color: #D29E62
  @media screen and (min-width: 769px) and (max-width: 1200px)
    .rank-bg
      width: 100px
      font-size: 46px

  .vote
    text-align: end
    font-size: 32px
    font-weight: 500
    @media screen and (max-width: 768px)
      display: inline-block
      align-self: flex-start
      width: 80%
    @media screen and (min-width: 769px)
      width: 200px
    @media screen and (min-width: 1200px)
      width: 280px
    .number
      font-size: 64px
      font-weight: 700
      color: #82D357
      -webkit-text-stroke: 1px
      @media screen and (min-width: 769px)
        font-size: 60px
      @media screen and (min-width: 1200px)
        font-size: 90px


  hr
    @media screen and (max-width: 768px)
      margin-bottom: 10px
    @media screen and (min-width: 769px)
      height: 50%
      margin: 0 30px

  .text
    font-size: 12px
    font-weight: 700
  .title
    font-size: 14px
    font-weight: 400
    margin: 0
    margin-bottom: 8px
    @media screen and (min-width: 769px)
      font-size: 24px
      font-weight: 900
  .lookup
    border-radius: 10px
</style>
