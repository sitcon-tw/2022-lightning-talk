<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
const { title, loading } = storeToRefs(store)

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
    <div class="center">
      <NuxtLink to="/" class="logo">
        <img src="~/assets/img/logo.svg" />
      </NuxtLink>
      <div class="title" id="title">
        <span v-if="!isHome">{{  title  }}</span>
      </div>
      <info-btn />
    </div>

    <transition name="fade" mode="in-out">
      <Loader style="position: fixed" v-if="loading > 0" />
    </transition>
  </nav>
</template>

<style scoped lang="sass">
nav
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 70px
  padding: 0 24px
  @media screen and (min-width: 769px)
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2)

.center
  position: relative
  flex: 1
  max-width: 992px
  display: flex
  justify-content: space-between
  align-items: center

.logo
  @media screen and (max-width: 768px)
    display: none
    .home &
      display: inline
  @media screen and (min-width: 769px)
    position: absolute
    left: 0
  img
    height: 36px

.back
  width: 32px
  height: 100%
  z-index: 1
  background: #F4EEE1
  display: flex
  justify-content: center
  .home &
    display: none
  @media screen and (min-width: 769px)
    position: absolute
    left: 24px
    top: 50%
    transform: translateY(-50%)

.title
  margin: 0 auto
  font-size: 24px
  font-weight: 700
  color: #383838

.info-btn
  width: 32px
  height: 32px
  padding: 4px
  @media screen and (min-width: 769px)
    position: absolute
    right: 0
    .home &
      display: none
</style>
