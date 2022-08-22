<script setup>
const open = ref(false)
</script>

<template>
  <div class="info-btn">
    <img @click="open = true" src="~/assets/img/info.svg" />
    <Teleport to="body">
      <transition name="infoModal">
        <div v-if="open" class="modal">
          <div class="modal-wrap">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
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
  margin: 20px auto
  padding: 16px
  border: none
  border-radius: 10px
  background-color: #FFFFFF
  color: #383838
  outline: none
  overflow-y: hidden
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

.infoModal-enter-active, .infoModal-leave-active
    transition: all .25s ease-in-out
.infoModal-enter-from
  opacity: 0
  .modal
    transform: scale(.5)
.infoModal-leave-to
  opacity: 0
  .modal
    transform: scale(.5)
</style>
