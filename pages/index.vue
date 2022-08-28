<script setup>
const store = useStore()
store.title = '首頁'

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
  <div>
    <div class="banner">
      <img src="~/assets/img/cat-flat.svg" />
      <div class="text-wrap">
        <h1>閃電秀</h1>
        <h2>投稿投票系統</h2>
      </div>
    </div>

    <div class="btns-wrap">
      <div class="btns">
        <template v-for="{ name, text, disabled } in routes">
          <span class="time">開放時段：{{ store.getTimeText(name) }}</span>
          <btn :to="`/${name}`" :disabled="!store.canVisit(name)">{{ text }}</btn>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.banner
  display: flex
  flex-direction: column
  align-items: center
.text-wrap
  position: relative
  width: 100%
h1
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, -50%)
  margin: 0
  font-size: 24px
  font-weight: 900
  color: transparent
  background-image: url(~/assets/img/lightning-talk.png)
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  text-indent: 8px
  letter-spacing: 8.6px
  text-indent: 8.6px
h2
  margin: 0
  color: #383838
  background: #FFFFFF
  width: 100%
  padding: 10px 0
  border-radius: 10px
  font-size: 40px
  font-weight: 900
  letter-spacing: 4px
  text-indent: 4px

.btns-wrap
  width: 70%
  margin: 0 auto
.btns
  display: flex
  flex-direction: column
  justify-content: space-between
  margin: 40px 0
.time
  color: #9D9D9D
  text-align: center
  font-size: 13px
  font-weight: 350
</style>
