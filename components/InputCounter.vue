<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disableDecrease: {
    type: Boolean,
    default: false,
  },
  disableIncrease: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const update = (value) => {
  if (typeof value !== 'number' || value < 0) {
    alert('請輸入合法數字')
    return false
  }
  emit('update:modelValue', value)
}

const decrease = () => update(props.modelValue - 1)
const increase = () => update(props.modelValue + 1)
</script>

<template>
  <div class="counter">
    <button
      class="control"
      :disabled="disabled || disableDecrease || modelValue <= 0"
      @click="decrease">
      <i class='bx bx-minus'></i>
    </button>
    <div class="value">{{  modelValue  }}</div>
    <!-- <input disabled v-model="modelValue" /> -->
    <button class="control" :disabled="disabled || disableIncrease" @click="increase"><i class='bx bx-plus'></i></button>
  </div>
</template>

<style scoped lang="sass">
.counter
  height: 36px
  display: inline-flex
  align-items: center
  border: 0.5px solid #9D9D9D
  border-radius: 8px
  overflow: hidden
*
  font-size: 20px
.value
  border: solid #9D9D9D
  border-width: 0 0.5px
  text-align: center
  width: 52px
.control
  width: 36px
  height: 36px
  color: #82D357
  background: none
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  border-radius: 8px
  &:hover
    background-color: rgba(0,0,0,.05)
  &:active
    background-color: rgba(0,0,0,.1)
  &:disabled
    color: #D4D4D4
    cursor: not-allowed
    opacity: .5
    pointer-events: none
</style>
