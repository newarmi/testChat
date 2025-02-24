<script setup>
import {ref} from "vue";
import UiBtn from "@/components/ui/UiBtn.vue";
import chuckIcon from "@/assets/icon/chuck.svg"
import airplaneIcon from "@/assets/icon/airplane.svg"
import UiTextarea from "@/components/ui/UiTextarea.vue";
import {useChatStore} from "@/store/chat.js";
import {chuckJokeService} from "@/services/chuckJokeService.js";

const message = ref('')

const {
  getChuckJokes
} = chuckJokeService()

const {sendMessage} = useChatStore()

const onJoke = async () => {
  const jokeText = await getChuckJokes()
  sendMessage(jokeText)
}

const onSend = () => {
  sendMessage(message.value)
  message.value = ''
}

</script>

<template>
  <div class="input-area">
    <div class="input-area__block">
      <div class="input-area__btn">
        <UiBtn>
          <img
              :src="chuckIcon"
              alt="Icon send chuck joke"
              width="24px"
              height="24px"
              @click="onJoke"
          >
        </UiBtn>
      </div>
      <UiTextarea
          class="input-area__textarea"
          v-model="message"
          @submit="onSend"
          @focus="$emit('focus')"
      />
      <div class="input-area__btn">
        <UiBtn>
          <img
              :src="airplaneIcon"
              alt="Icon send message"
              width="24px"
              height="24px"
              @click="onSend"
          >
        </UiBtn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-area {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;

  padding: 15px 16px;

  &__block {
    background: var(--black);
    border-radius: 24px;

    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__textarea {
    flex-grow: 1;
  }

  &__btn {
    padding: 6px;
    align-self: flex-end;
  }
}
</style>