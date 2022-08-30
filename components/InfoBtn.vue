<script setup>
const open = ref(false)
</script>

<template>
  <div class="info-btn">
    <img @click="open = true" src="~/assets/img/info.svg" />
    <modal v-model:open="open" disable-close>
      <div class="info-bar"></div>
      <img class="info" src="~/assets/img/info-fill.svg" />
      <div class="pad"></div>
      <info-text />
      <btn @click="open = false">確認</btn>
    </modal>
  </div>
</template>

<style scoped lang="sass">
img
  cursor: pointer
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
</style>
