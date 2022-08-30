<script setup>
const props = defineProps({
  talk: {
    type: Object,
  },
  vote: {
    type: Number,
    default: null,
  },
  count: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['update:talk', 'update:vote'])

const open = computed(() => !!props.talk)
const close = (update = false) => {
  if (!update) emit('update:vote', savedVote)
  emit('update:talk', null)
}

let savedVote = props.vote
const curVote = computed({
  get: () => props.vote,
  set: (val) => emit('update:vote', val)
})
watch(open, (v) => {
  if (v) savedVote = props.vote
})
</script>

<template>
  <div class="talk-modal">
    <div class="modal placeholder hide-mobile" v-if="!open">點擊左側任一「查看摘要」按鈕以顯示內容。</div>
    <Transition name="modal">
      <div class="modal" v-if="open">
        <a class="close hide-desktop" @click="close(false)">
          <img src="~/assets/img/X.svg" />
        </a>
        <div class="info">
          <h1 class="title">{{ talk.title }}</h1>
          <hr class="hide-mobile" />
          <div class="text">摘要</div>
          <div class="description">{{ talk.description || '講者未填寫摘要' }}</div>
        </div>
        <template v-if="curVote !== null">
          <hr class="hide-desktop" />
          <vote-counter class="hide-desktop" v-model="curVote" :disableIncrease="count.remain <= 0" />
          <hr class="hide-desktop" />
          <btn class="hide-desktop" @click="close(true)">確認</btn>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.talk-modal
  @media screen and (min-width: 769px)
    flex: 0 0 40%

.modal
  height: 100%
  background: #FFFFFF
  border-radius: 20px 20px 0px 0px
  padding: 10px
  display: flex
  flex-direction: column
  @media screen and (max-width: 768px)
    position: absolute
    top: 0
    left: -20px
    width: calc(100% + 40px)
    display: flex

.placeholder
  color: #9D9D9D
  align-items: center
  padding-top: 50%

.close
  position: relative
  flex: 0 0 40px
  img
    position: absolute
    top: 0
    right: 0
    &:hover
      transition: all .25s ease
      opacity: 0.8
      cursor: pointer
      transform: scale(.95)

.info
  overflow-y: scroll
  flex: 1
  display: flex
  flex-direction: column
  @media screen and (min-width: 769px)
    margin: 0 16px
.title
  align-self: center
  text-align: left
  font-size: 24px
  font-weight: 900
  letter-spacing: 1px
  @media screen and (min-width: 769px)
    font-size: 40px
    margin: 80px 0
.text
  font-size: 12px
  font-weight: 700
  @media screen and (min-width: 769px)
    font-size: 24px
    margin-top: 32px
    margin-bottom: 16px
.description
  font-size: 16px
  font-weight: 400
  white-space: per-line
  @media screen and (min-width: 769px)
    font-size: 20px

.btn
  margin-top: 12px
</style>
