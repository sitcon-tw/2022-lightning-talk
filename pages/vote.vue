<script setup>
const store = useStore()

const talks = ref(
  Array(10)
    .fill()
    .map((v, id) => ({
      id,
      title:
        'AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討 AI 分析 - 貓咪之可愛程度與貓咪成液態狀的比例之探討',
      description:
        `
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        貓咪是一種可愛的動物，但是貓咪成液態狀的比例是多少呢？貓咪之可愛程度與貓咪成液態狀的比例之探討
        `,
    })),
)
const modelTalk = ref()

const vote = ref({})
for (const talk of talks.value) {
  vote.value[talk.id] = 0
}

const submit = () => {
  console.log(vote.value)
}
</script>

<template>
  <div class="root">
    <non-token-modal  />

    <div class="page">
      <div class="talks">
        <div class="talk" v-for="talk in talks" :key="talk.id">
          <h1 class="title">{{ talk.title }}</h1>
          <hr />
          <vote-counter v-model="vote[talk.id]" />
          <button class="lookup" @click="modelTalk = talk">查看摘要</button>
        </div>
      </div>
      <btn class="submit" @click="submit">送出</btn>
    </div>
    <talk-modal v-model:talk="modelTalk" v-model:vote="vote[modelTalk?.id]" />
  </div>
</template>

<style scoped lang="sass">
.talks
  overflow: scroll
  display: grid
  // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: 16px
.talk
  height: 240px
  display: flex
  flex-direction: column
  background: #FFFFFF
  border-radius: 10px
  overflow: hidden
  .title
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    flex: 1
    font-size: 24px
    font-weight: 900
    letter-spacing: 5px
    margin: 16px 26px
  .lookup
    height: 36px
    font-size: 20px
    font-weight: 400
    color: #FFFFFF
    background: #82D357
</style>
