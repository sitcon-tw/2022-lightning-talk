<script setup>
import ordinal from 'ordinal'

useHead({
  title: '投票結果',
})

const talks = ref(
  Array(10)
    .fill()
    .map((v, id) => ({
      id,
      title:
        'AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討',
      description:
        '貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討',
      vote: Math.ceil(Math.random() * 2000),
    })),
)
const sortedTalks = computed(() => talks.value.sort((a, b) => b.vote - a.vote))
const modelTalk = ref(null)

const addComma = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
</script>

<template>
  <div class="root">
    <div class="page">
      <div class="talks">
        <div class="talk" v-for="(talk, rank) in sortedTalks" :key="talk.id">
          <div class="rank-bg">
            <div class="rank">{{ ordinal(rank + 1) }}</div>
          </div>
          <div class="vote">
            <span class="number">{{ addComma(talk.vote) }}</span>
            票
          </div>
          <hr />
          <div class="text">議程名稱</div>
          <h1 class="title">{{ talk.title }}</h1>
          <button class="lookup" @click="modelTalk = talk">查看摘要</button>
        </div>
      </div>
    </div>
    <talk-model v-model:talk="modelTalk" />
  </div>
</template>

<style scoped lang="sass">
.talks
  overflow: scroll
  display: grid
  gap: 16px

.talk
  height: 240px
  position: relative
  display: flex
  flex-direction: column
  background: #FFFFFF
  border-radius: 10px
  overflow: hidden
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
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  flex: 1
  font-size: 14px
  font-weight: 400
  margin: 0

.lookup
  height: 36px
  font-size: 20px
  font-weight: 400
  color: #FFFFFF
  background: #82D357
  border-radius: 10px
</style>
