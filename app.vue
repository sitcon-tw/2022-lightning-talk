<script setup>
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

useHead({
  titleTemplate: '%s | 閃電秀投稿投票系統',
})

const store = useStore()
const hide = computed(() => !store.canVisit())

const updateVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
if (process.client) useEventListener(window, 'resize', updateVh)
onMounted(() => {
  if (process.client) updateVh()
})
</script>

<template>
  <div id="app" :class="{ hide }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="sass">
*
  box-sizing: border-box
  line-height: inherit
  word-break: inherit
html, body
  margin: 0
  padding: 0
  font-family: 'Noto Sans TC', sans-serif
  overflow: hidden
  line-height: 1.5
  word-break: break-word
h1, h2
  margin: 0
  text-align: center
img
  max-width: 100%
button, input, textarea
  border: none
hr
  border: 0.5px solid #C6C6C6
  margin: 0


.hide-desktop
  @media screen and (min-width: 769px)
    display: none !important
.hide-mobile
  @media screen and (max-width: 768px)
    display: none !important

#app
  height: calc(var(--vh,1vh) * 100)
  @supports (height: 100dvh)
    height: 100dvh
  width: 100vw
  background: #F4EEE1

.root
  height: 100%
  position: relative
  display: flex
  flex-direction: column
  @media screen and (min-width: 769px)
    gap: 30px
    flex-direction: row
  .page
    height: 100%
    flex: 6
    display: flex
    flex-direction: column
    > :nth-child(1)
      margin-bottom: 16px
    @media screen and (min-width: 769px)
      &.has-talk-modal
        width: 60%
  .hide & > *
    display: none

.status-text
  flex: 1
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  font-size: 24px

.submit
  margin-bottom: 16px

.modal-enter-active, .modal-leave-active
  transition: all .25s ease-in-out
.modal-enter-from
  opacity: 0
  .modal
    transform: scale(.5)
.modal-leave-to
  opacity: 0
  .modal
    transform: scale(.5)


.talks
  overflow: scroll
  flex: 1
  display: grid
  gap: 16px
.talk
  height: 240px
  position: relative
  display: flex
  flex-direction: column
  background: #FFFFFF
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  overflow: hidden
  &.active
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: calc(100% - 12px)
      height: calc(100% - 12px)
      border: 6px solid #82D357
      border-radius: 10px
  .title
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    text-align: left
    align-self: center
    flex: 1
    letter-spacing: 5px
  .lookup
    height: 36px
    font-size: 20px
    font-weight: 400
    color: #FFFFFF
    background: #82D357
    border-radius: 0 0 10px 10px
</style>
