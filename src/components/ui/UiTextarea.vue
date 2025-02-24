<script setup>
import {computed, nextTick, useTemplateRef, watchEffect} from "vue";

const model = defineModel({
  default: ''
});

const emit = defineEmits(['submit', 'focus']);
const contentEl = useTemplateRef('contentEl');

const onInput = (e) => {
  model.value = e.target.innerText.trim().replace(/^\n+|\n+$/g, '');
};

watchEffect(async () => {
  if (contentEl.value && model.value !== contentEl.value.innerText) {
    contentEl.value.innerText = model.value;
    await nextTick();

    const range = document.createRange();
    range.selectNodeContents(contentEl.value);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
});
const onDownEnter = (e) => {
  if (e.shiftKey) {
  } else {
    emit('submit')
  }

}
const isTouched = computed(() => !!model.value);

</script>

<template>
  <div
      class="textarea"
  >
    <div
        @input="onInput"
        ref="contentEl"
        class="textarea__content"
        contenteditable="true"
        role="textbox"
        tabindex="0"
        aria-label="Message"
        @keyup.enter.prevent="onDownEnter"
        @focus="emit('focus')"
    >
    </div>
    <transition name="fade-right">
      <span
          v-show="!isTouched"
          dir="auto"
          class="textarea__placeholder"
      >
      Type here ...
    </span>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.textarea {
  position: relative;

  &__content {
    border: none;
    outline: none;

    padding: 12px 0;

    height: auto;
    width: 100%;
    white-space: pre-line;

    line-height: 1.2rem;
  }

  &__placeholder {
    position: absolute;
    left: 0;
    top: 30%;

    font-size: 1rem;
    color: var(--gray-light);

    pointer-events: none;
  }
}

</style>