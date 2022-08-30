<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  disableClose: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: {},
  },
})
const emit = defineEmits(['update:open'])

const close = () => emit('update:open', false)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal" :style="style">
        <div class="modal-wrap">
          <a class="close" v-if="!disableClose" @click="close">
            <img src="~/assets/img/X.svg" />
          </a>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="sass">
.modal-wrap .close + :slotted(*)
  margin-left: 40px
  margin-right: 40px

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
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  // min-width: calc(100vw - 40px)
  max-width: 960px
  min-height: 200px
  max-height: calc(var(--vh,1vh) * 100 - 40px)
  @supports (height: 100dvh)
    max-height: calc(100dvh - 40px)
  margin: 20px 8px
  padding: 16px
  min-width: min(512px,100vw)
  border-radius: 10px
  background-color: #FFFFFF
  color: #383838
  outline: none
  position: relative
  cursor: initial
  transition: all 0.25s ease
  animation: modal-show 0.25s ease-in-out

.close
  position: absolute
  top: 8px
  right: 8px
  transition: all .25s ease
  width: 40px
  height: 40px
  &:hover
    opacity: 0.8
    cursor: pointer
    transform: scale(.95)

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
