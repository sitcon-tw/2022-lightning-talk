<script setup>
const props = defineProps({
  talk: {
    type: Object,
  },
  vote: {
    type: Number,
    default: null,
  },
})
const emit = defineEmits(['update:talk', 'update:vote'])

const open = computed(() => !!props.talk)
const close = (update = false) => {
  if (update) emit('update:vote', curVote.value)
  emit('update:talk', null)
}

const curVote = ref()
watch(open, (v) => {
  if (v) {
    curVote.value = props.vote
  }
})
</script>

<template>
  <Transition name="modal">
    <div class="modal" v-if="open">
      <a class="close" @click="close(false)">
        <img src="~/assets/img/X.svg" />
      </a>
      <div class="info">
        <h1 class="title">{{ talk.title }}</h1>
        <div class="text">摘要</div>
        <div class="description">{{ talk.description }}</div>
      </div>
      <template v-if="curVote !== null">
        <hr />
        <vote-counter v-model="curVote" />
        <hr />
        <btn @click="close(true)">確認</btn>
      </template>
    </div>
  </Transition>
</template>

<style scoped lang="sass">
.modal
  position: absolute
  top: 0
  left: -20px
  width: calc(100% + 40px)
  height: 100%
  background: #FFFFFF
  border-radius: 20px 20px 0px 0px
  padding: 10px
  display: flex
  flex-direction: column

.close
  position: relative
  flex: 0 0 40px
  transition: all .25s ease
  &:hover
    opacity: 0.8
    cursor: pointer
    transform: scale(.95)
  img
    position: absolute
    top: 0
    right: 0

.info
  overflow-y: scroll
.title
  font-size: 24px
  font-weight: 900
  letter-spacing: 1px
.text
  font-size: 12px
  font-weight: 700
.description
  font-size: 16px
  font-weight: 400
  white-space: per-line

.btn
  margin-top: 12px
</style>
