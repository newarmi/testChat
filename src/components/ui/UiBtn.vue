<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click']);

</script>

<template>
  <button :class="{
    loading
  }" @click="emit('click')">
    <slot/>
  </button>
</template>

<style scoped lang="scss">
button {
  border-radius: 50%;
  padding: .3rem;

  transition: background-color .3s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  &.loading {
    animation: breath;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--gray);
    }
  }

  &:active {
    background: var(--gray);
  }
}


</style>