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

const curVote = ref(null)
watch(open, (v) => {
  if (v) {
    curVote.value = props.vote
  }
})
</script>

<template>
  <Transition name="modal">
    <div class="modal" v-if="open">
      <div class="modal-wrap">
        <p>Hello from the modal! {{ talk }} {{ vote }}</p>
        <button @click="close(false)">Close</button>
        <template v-if="curVote">
          <input-counter v-model="curVote" />
          <button @click="close(true)">確認</button>
        </template>
      </div>
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
</style>
