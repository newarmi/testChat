import {defineStore} from "pinia";
import {reactive, ref, watch} from "vue";
import {useWebSocket} from "@/composble/useWebsoket.js";

export const useChatStore = defineStore('chat', () => {
    const {emitter, send, close, connect} = useWebSocket('ws://192.168.0.186:8000', 'type')
    const isTyping = ref(false)
    const messagesList = reactive([])

    emitter.on('message', (e) => {
        messagesList.push({
            self: false,
            message: e.message
        })
    })

    emitter.on('isTyping', (e) => {
        isTyping.value = e.message
    })

    const sendMessage = (message) => {
        if (message) {
            send({
                type: 'message',
                message,
            })

            messagesList.push({
                self: true,
                message,
            })
        }

    }

    connect()

    const typing = (flag) => {
        send({
            type: 'message',
            message: flag,
        })

    }

    return {
        close,
        sendMessage,
        isTyping,
        typing,
        messagesList,
    }
})