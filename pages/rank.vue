<script setup>
import { storeToRefs } from 'pinia'
import ordinal from 'ordinal'

const store = useStore()
const { talks } = storeToRefs(store)

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
    <div class="status-text" v-if="loading">
      <Loader />
    </div>
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
.root
  padding-top: 24px
.talks
  padding: 16px 8px
  padding-top: 0
  margin: 0 -8px
.talk
  padding: 8px 16px
  cursor: pointer
  @media screen and (min-width: 1375px)
    flex-direction: row
    align-items: center
    font-size: 64px

  @media screen and (max-width: 1375px)
    .rank-bg
      position: absolute
      top: 0
      right: 0
      width: 64px
      height: 64px
      font-weight: 500
      background: #82D357
      border-radius: 0 6px 0 100%
    .rank
      font-size: 20px
      text-align: right
      padding-top: 12px
      padding-right: 4px
      color: #FFFFFF
  @media screen and (min-width: 1375px)
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

  .vote
    text-align: end
    font-size: 32px
    font-weight: 500
    @media screen and (max-width: 1375px)
      display: inline-block
      align-self: flex-start
      width: 80%
    @media screen and (min-width: 1376px)
      width: 280px
      font-size: 24px
    .number
      font-size: 2em
      font-weight: 700
      color: #82D357
      -webkit-text-stroke: 1px
      @media screen and (min-width: 769px)
        font-size: 60px
      @media screen and (min-width: 1376px)
        font-size: 90px


  hr
    @media screen and (max-width: 1376px)
      margin-bottom: 10px
    @media screen and (min-width: 1375px)
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
    @media screen and (min-width: 1375px)
      font-size: 24px
      font-weight: 900
  .lookup
    border-radius: 10px
    font-size: 12px
</style>
