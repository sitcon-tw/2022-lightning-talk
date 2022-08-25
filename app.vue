<script setup>
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

useHead({
  titleTemplate: '%s | 閃電秀投稿投票系統',
})

const route = useRoute()
const router = useRouter()
const store = useStore()
store.setupToken(route.query.token)

const updateVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
onMounted(() => {
  updateVh()
  document.addEventListener('resize', updateVh)
})
onBeforeUnmount(() => {
  document.removeEventListener('resize', updateVh)
})
</script>

<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="sass">
*
  box-sizing: border-box
  line-height: inherit
html, body
  margin: 0
  padding: 0
  font-family: 'Noto Sans TC', sans-serif
  overflow: hidden
  line-height: 1.5
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

#app
  height: calc(var(--vh,1vh) * 100)
  @supports (height: 100dvh)
    height: 100dvh
  width: 100vw
  background: #F4EEE1

.root
  height: 100%
  position: relative
  .page
    height: 100%
    display: flex
    flex-direction: column
    > :nth-child(1)
      margin-bottom: 16px

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
</style>
