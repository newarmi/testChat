<script setup>
import {useChatStore} from "@/store/chat.js";
import {storeToRefs} from "pinia";
import MessageItemChat from "@/components/Chat/List/MessageItemChat.vue";
import {nextTick, useTemplateRef, watch} from "vue";

const {messagesList} = storeToRefs(useChatStore())
const messageListRef = useTemplateRef('container')

const scrollBottom = () => {

  messageListRef.value.scrollTo({
    top: messageListRef.value.scrollHeight,
    behavior: 'smooth'
  })
}

watch(messagesList.value, async () => {
  await nextTick()
  scrollBottom()
})

</script>

<template>
  <div
      class="list-message"
      ref="container"
  >
    <div
        class="list-message__area"
    >
      <div class="list-message__no-message" v-if="!messagesList.length">
        Нет сообщений
      </div>
      <MessageItemChat
          v-for="({self, message}, i) in messagesList"
          :self="self"
          :text="message"
          :key="i" #message id
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-message {
  overflow-y: auto;
  overflow-x: hidden;

  &__area {
    display: flex;

    flex-direction: column;
    justify-content: flex-end;
  }

  &__no-message {
    padding: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>