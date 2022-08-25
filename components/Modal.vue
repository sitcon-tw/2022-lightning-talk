<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  allowClose: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal">
        <div class="modal-wrap">
          <a class="close" v-if="allowClose" @click="close">
            <img src="~/assets/img/X.svg" />
          </a>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="sass">
.modal
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 100
  display: flex
  justify-content: center
  align-items: center
  animation: fade-in 0.25s ease-in-out

.modal-wrap
  min-width: calc(100vw - 40px)
  min-height: 500px
  max-height: calc(100vh - 40px)
  margin: 20px 8px
  padding: 16px
  border-radius: 10px
  background-color: #FFFFFF
  color: #383838
  outline: none
  position: relative
  cursor: initial
  transition: all 0.25s ease
  animation: modal-show 0.25s ease-in-out

@keyframes fade-in
  from
    opacity: 0
  to
    opacity: 1
@keyframes modal-show
  from
    opacity: 0
    transform: scale(.5)
  to
    opacity: 1
    transform: none
</style>
