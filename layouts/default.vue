<template>
  <div class="outer-container">
    <nav-bar />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="sass">
.outer-container
  height: 100%
.container
  overflow-y: scroll
  height: calc(100% - 70px)
  padding: 0 20px
</style>
