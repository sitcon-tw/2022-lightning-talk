<script setup>
const store = useStore()

const routes = [
  {
    name: 'post',
    text: '我要投稿',
  },
  {
    name: 'vote',
    text: '我要投票',
  },
  {
    name: 'rank',
    text: '查看排名',
  },
]
</script>

<template>
  <div class="index">
    <div class="left hide-mobile">
    </div>
    <div class="right">
      <div class="banner">
        <img class="hide-desktop" src="~/assets/img/cat-flat.svg" />
        <div class="text-wrap">
          <h1>閃電秀</h1>
          <h2>投稿投票系統</h2>
        </div>
      </div>

      <info-text class="align-left hide-mobile" />

      <div class="btns">
        <div class="btn-block" v-for="{ name, text } in routes" :class="name" :key="name">
          <div class="time">開放時段：{{  store.getTimeText(name)  }}</div>
          <btn :to="`/${name}`" :disabled="!store.canVisit(name)">{{  text  }}</btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.index
  display: grid
  @media screen and (min-width: 769px)
    grid-template-columns: 1fr 1fr

.left
  background-image: url(~/assets/img/cat-index.svg)
  background-repeat: no-repeat
  background-size: cover
  background-position: right

.right
  display: flex
  flex-direction: column
  @media screen and (min-width: 769px)
    max-width: 540px

.banner
  display: flex
  flex-direction: column
  align-items: center
.text-wrap
  position: relative
  width: 100%
h1
  font-weight: 900
  color: transparent
  background-image: url(~/assets/img/lightning-talk.png)
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  text-indent: 8px
  letter-spacing: 8.6px
  text-indent: 8.6px
  @media screen and (max-width: 768px)
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -100%)
    font-size: 24px
  @media screen and (min-width: 769px)
    font-size: 36px
    line-height: 40px
    background-position: left
    text-align: left
h2
  color: #383838
  background: #FFFFFF
  width: 100%
  padding: 10px 0
  border-radius: 10px
  font-size: 40px
  font-weight: 900
  letter-spacing: 4px
  text-indent: 4px
  @media screen and (min-width: 769px)
    padding: 0
    text-align: left
    background: none
    font-size: 84px
    line-height: 94px
    margin-bottom: 24px

.btns-wrap
  margin: 0 auto
.btns
  align-self: center
  display: grid
  @media screen and (max-width: 768px)
    width: 70%
    margin: 40px 0
    gap: 16px
    grid-template-areas: "post" "vote" "rank"
  @media screen and (min-width: 769px)
    width: 100%
    margin: 24px 0
    gap: 16px 30px
    grid-template-columns: 1fr 1fr
    grid-template-areas: "post vote" "rank rank"
.post
  grid-area: post
.vote
  grid-area: vote
.rank
  grid-area: rank
.time
  color: #9D9D9D
  text-align: center
  font-size: 13px
  font-weight: 350
</style>
