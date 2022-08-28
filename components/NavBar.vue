<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
const { title } = storeToRefs(store)

const route = useRoute()
const isHome = computed(() => route.name === 'index')

useHead({ title })
</script>

<template>
  <nav :class="{ home: isHome }" class="nav-bar">
    <visable-check-modal />

    <NuxtLink to="/" class="back">
      <img src="~/assets/img/arrow-left.svg" />
    </NuxtLink>
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/logo.svg" />
    </NuxtLink>
    <div class="title">
      <span v-if="!isHome">{{ title }}</span>
    </div>
    <info-btn />
  </nav>
</template>

<style scoped lang="sass">
nav
  display: flex
  justify-content: space-between
  align-items: center
  height: 70px
  padding: 0 24px

.logo
  display: none
  .home &
    display: initial
  img
    height: 36px

.back
  display: initial
  width: 32px
  height: 32px
  .home &
    display: none

.title
  font-size: 24px
  font-weight: 700
  color: #383838

.info-btn
  width: 32px
  height: 32px
  padding: 4px
</style>
