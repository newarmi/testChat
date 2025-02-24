<script setup>
import ListChat from "@/components/Chat/List/ListChat.vue";
import InputAreaChat from "@/components/Chat/InputAreaChat.vue";

const viewport = window.visualViewport;

function updateVH() {
  document.documentElement.style.setProperty('--vh', `${viewport.height / 100}px`);
}

updateVH()

viewport.addEventListener('resize', updateVH);
</script>

<template>
  <div class="chat">
    <ListChat class="chat__list"/>
    <InputAreaChat @focus="updateVH" class="chat__input"/>
  </div>
</template>

<style scoped lang="scss">
.chat {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    max-width: 1024px;
    margin: 0 auto;
  }

  &__list {
    flex: 1 1 auto;
  }


}
</style>
