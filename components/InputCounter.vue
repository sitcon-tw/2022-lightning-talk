<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
  },
  disabled: {
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
      :disabled="disabled || modelValue <= 0"
      @click="decrease"
    >
      -
    </button>
    <div class="value">{{ modelValue }}</div>
    <!-- <input disabled v-model="modelValue" /> -->
    <button class="control" :disabled="disabled" @click="increase">+</button>
  </div>
</template>

<style scoped lang="sass">
.counter
  height: 36px
  display: inline-flex
  align-items: center
  border: 0.5px solid #9D9D9D
  border-radius: 8px
*
  font-size: 20px
.value
  border: solid #9D9D9D
  border-width: 0 0.5px
  text-align: center
  width: 52px
.control
  width: 36px
  color: #82D357
  background: none
  &:disabled
    color: #D4D4D4
    cursor: not-allowed
</style>
