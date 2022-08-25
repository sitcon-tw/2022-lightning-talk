<script setup>
const open = ref(false)
</script>

<template>
  <div class="info-btn">
    <img @click="open = true" src="~/assets/img/info.svg" />
    <modal v-model="open" :allow-close="false">
      <div class="info-bar"></div>
      <img class="info" src="~/assets/img/info-fill.svg" />
      <div class="pad"></div>
      <h2>投稿須知</h2>
      <ol>
        <li>投稿時間為年會當天 8:30 ~ 12:30</li>
        <li>採用線上投稿，可以從 OPass 或官網投稿／投票。官網投稿／投票的地方為 議程資訊 => Lightning Talk</li>
        <li>下午 12:30 後將會開放與會者投票，票數最高的前十名將獲得最終在 R0 會議廳分享的機會</li>
        <li>為鼓勵大家盡早投稿，獲得相同票數的搞件，先投稿的人排名會比較高</li>
        <li>議程組將會於投票結束時，透過投稿人在投稿時填寫的聯絡方式通知，請務必填寫可以被聯繫到的聯繫方式</li>
      </ol>
      <h2>投票須知</h2>
      <ol>
        <li>投票時間為年會當天 12:30~15:15</li>
        <li>一人有十個投票點數，可以自由決定要怎麼分配。可以十點都給同一個稿件，也可以平均分配給十個稿件</li>
        <li>投票後無法再更改票數分配</li>
      </ol>
      <btn @click="open = false">確認</btn>
    </modal>
  </div>
</template>

<style scoped lang="sass">
.info
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, -50%)
.info-bar
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 16px
  background-color: #82D357
  border-radius: 10px 10px 0px 0px

.pad
  height: 24px

h2
  margin: 8px 0
  font-size: 16px
  font-weight: 700
ol
  margin: 8px 0
  padding-inline-start: 24px
li
  font-size: 14px
  font-weight: 400
</style>
