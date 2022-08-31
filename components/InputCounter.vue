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
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
})
const emit = defineEmits(['update:modelValue'])

function validate(value) {
  if (typeof value !== 'number') return alert('請輸入合法數字'), props.min
  if (value < props.min) return alert('數字不能小於' + props.min), props.min
  if (value > props.max) return alert('數字不能大於' + props.max), props.max
  return true
}

const refValue = ref()
const count = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    const res = validate(value)
    if (res === true) ;
    else if (typeof res === 'number') value = res
    else return
    refValue.value.value = value
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="counter">
    <button
      class="control"
      :disabled="disabled || disableDecrease || count <= min"
      @click="count--"
    >
      <i class="bx bx-minus"></i>
    </button>
    <input
      class="value"
      type="number"
      ref="refValue"
      v-model.lazy.number="count"
    />
    <button
      class="control"
      :disabled="disabled || disableIncrease || count >= max"
      @click="count++"
    >
      <i class="bx bx-plus"></i>
    </button>
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
