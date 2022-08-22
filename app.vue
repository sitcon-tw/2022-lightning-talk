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

#app
  height: 100vh
  width: 100vw
  background: #F4EEE1
</style>
