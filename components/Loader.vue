<template>
  <div class="loading" />
</template>

<style scoped lang="sass">
.loading
  width: 25px
  height: 25px
  border-radius: 50%
  border: 4px solid #A89B85
  border-top: 4px solid transparent
  animation: loading 1s linear infinite
  top: 8px
  right: 8px
  @media (max-width: 768px)
    top: 2px
    right: 2px
    width: 20px
    height: 20px
    border: 2.5px solid #A89B85
    border-top: 2.5px solid transparent
@keyframes loading
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
