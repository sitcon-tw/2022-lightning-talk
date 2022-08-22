<script setup>
useHead({
  title: '首頁',
})
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
        <span class="time">開放時段：XX:XX ~ XX:XX</span>
        <btn to="/post">我要投稿</btn>
        <span class="time">開放時段：XX:XX ~ XX:XX</span>
        <btn to="/vote">我要投票</btn>
        <span class="time">開放時段：XX:XX ~ XX:XX</span>
        <btn to="/rank">查看排名</btn>
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
h1
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, -50%)
  margin: 0
  font-size: 24px
  font-weight: 900
  color: #82D357
  -webkit-text-stroke: 1px #FFFFFF
  text-align: center
  background: url(~/assets/img/閃電秀.svg) no-repeat center center
  text-indent: 8px
  letter-spacing: 8.6px
h2
  margin: 0
  color: #383838
  background: #FFFFFF
  padding: 10px 32px
  border-radius: 10px
  text-align: center
  font-size: 40px
  font-weight: 900
  letter-spacing: 4px

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
