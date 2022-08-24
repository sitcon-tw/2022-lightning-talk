<script setup>
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
    <Head>
      <link rel="icon" type="image/svg" href="/2022-lightning-talk/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/2022-lightning-talk/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/2022-lightning-talk/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/2022-lightning-talk/favicon-16x16.png">
      <link rel="manifest" href="/2022-lightning-talk/site.webmanifest">
      <!-- Google Fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Syncopate:wght@700&family=Roboto+Condensed:wght@400;700&display=swap" crossorigin="true" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="sass">
*
  box-sizing: border-box
html, body
  margin: 0
  padding: 0
  font-family: 'Noto Sans TC', sans-serif
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
