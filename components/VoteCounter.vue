<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
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
    <input-counter
      v-model="vote"
      :disabled="disabled"
      :min="min"
      :max="max"
    />
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
