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

const vote = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="vote-counter">
    <div class="text">票數</div>
    <input-counter v-model="vote" :disabled="disabled" :disableDecrease="disableDecrease" :disableIncrease="disableIncrease" />
  </div>
</template>

<style scoped lang="sass">
.vote-counter
  display: inline-flex
  justify-content: space-between
  align-items: center
  height: 36px
  margin: 8px 16px
  .text
    font-size: 14px
    font-weight: 350
</style>
