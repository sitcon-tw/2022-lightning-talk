<template>
  <div id="app">
    <Head>
      <!-- Google Fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="true"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Syncopate:wght@700&family=Roboto+Condensed:wght@400;700&display=swap"
        crossorigin="true"
      />
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

#app
  height: 100vh
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
