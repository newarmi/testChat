<script setup>
import checkIcon from "@/assets/icon/check.svg"

defineProps({
  text: {
    type: String,
    required: true,
  },
  self: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <div
      class="message-item"
      :class="{
        self,
      }"
  >
    <div class="message-item__content">
      {{ text }}
    </div>
    <div class="message-item-meta message-item__meta">
      <img v-if="self" :src="checkIcon" alt="Icon check message">
      <div class="message-item-meta__time">
        12:00
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-item {
  margin-top: 20px;
  display: flex;

  flex-direction: column;
  align-self: self-start;
  align-items: flex-start;

  padding: 0 15px;

  &__content {
    display: inline-block;

    padding: 15px;
    border-radius: 4px 8px 8px 16px;

    font-size: 1rem;
    line-height: 1.3em;
    white-space: pre-line;

    background: var(--gray-light);
  }

  &__meta {
    margin-top: 8px;
  }

  &.self {
    align-self: flex-end;
    align-items: flex-end;

    .message-item__content {
      border-radius: 8px 4px 16px 8px;

      align-self: self-end;

      background: var(--blue);
    }
  }

  &-meta {
    display: flex;
    align-items: center;
    gap: 4px;

    &__time {
      font-size: .8rem;
    }
  }
}

</style>