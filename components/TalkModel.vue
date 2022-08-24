<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
  },
})
const emit = defineEmits(['update:modelValue'])

const open = computed(() => !!props.modelValue)
const close = () => emit('update:modelValue', null)
</script>

<template>
  <Transition name="modal">
    <div class="modal" v-if="open">
      <div class="modal-wrap">
        <p>Hello from the modal!</p>
        <button @click="close">Close</button>
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
