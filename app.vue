<script setup>
useHead({
  titleTemplate: '%s | 閃電秀投稿投票系統',
})

const store = useStore()
const hide = computed(() => !store.canView())

const updateVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
if (process.client) useEventListener(window, 'resize', updateVh)
onMounted(() => {
  if (process.client) updateVh()
})

if (process.client) {
  ! function (e, t, a, n, g) {
    e[n] = e[n] || [], e[n].push({
      "gtm.start": (new Date).getTime(),
      event: "gtm.js"
    });
    var m = t.getElementsByTagName(a)[0],
      r = t.createElement(a);
    r.async = !0, r.src = "https://www.googletagmanager.com/gtm.js?id=GTM-NPVBCDZ", m.parentNode.insertBefore(r, m)
  }(window, document, "script", "dataLayer");
}
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
input
  -moz-appearance: textfield
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    display: none
hr
  border: 0.5px solid #C6C6C6
  margin: 0
ul
  padding-left: 20px

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

.hide .root
  :not(.page), .page > *
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

.modal-enter-active, .modal-leave-active,
.talk-modal-enter-active, .talk-modal-leave-active
  transition: all .25s ease-in-out
.talk-modal-enter-active, .talk-modal-leave-active
  transform-origin: bottom center
.modal-enter-from,
.modal-leave-to
  opacity: 0
  .modal
    transform: scale(0.9)
.talk-modal-enter-from,
.talk-modal-leave-to
  opacity: 0
  transform: translateY(10em)


.talks
  overflow-y: scroll
  flex: 1
  display: grid
  gap: 16px
  padding: 8px
  margin: 0 -8px
  align-items: start
  align-content: start
.talk
  position: relative
  display: flex
  flex-direction: column
  background: #FFFFFF
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  border: 4px solid transparent
  padding: 4px 8px
  transition: all .25s ease-in-out
  &.active
    border: 4px solid #82D357
  .title
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    text-align: left
    flex: 1
  .lookup
    height: 36px
    font-weight: 400
    color: #FFFFFF
    background: #82D357
    border-radius: 4px
    cursor: pointer
    &:hover
      background: #82D357
      opacity: 0.8
</style>
