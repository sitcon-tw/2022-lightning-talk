<script setup>
const props = defineProps({
  to: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "_blank",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const link = computed(() => props.disabled ? "" : props.href || props.to)
</script>

<template>
  <NuxtLink class="btn" :class="{ disabled }" :to="link" :target="href ? target : ''">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="sass">
.btn
  display: flex
  align-items: center
  justify-content: center
  background: #82D357
  color: #FFFFFF
  border-radius: 10px
  padding: 12px 32px
  text-decoration: none
  text-align: center
  box-shadow: inset 0 0 0 2px #82D357
  font-weight: 400
  font-size: 20px
  letter-spacing: 8px
  text-indent: 8px
  transition: all 0.2s ease
  &:hover
    background: transparent
    color: #82D357
  &.disabled
    box-shadow: none
    background: #D4D4D4
    color: #AEAEAE
    cursor: not-allowed
</style>
