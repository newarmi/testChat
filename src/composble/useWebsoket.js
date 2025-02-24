import {reactive, watch} from 'vue';
import EventEmitter from "eventemitter3";

export function useWebSocket(url, eventName) {
    const _messagesList = reactive([]);
    let _socket = null;

    const connect = () => {
        _socket = new WebSocket(url);

        _socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            _messagesList.push(message);
        };

        _socket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
        };

        _socket.onclose = () => {
            console.log('WebSocket отключен');
            setTimeout(() => connect(), 3000);
        };
    };

    const send = (message) => {
        if (_socket && _socket.readyState === WebSocket.OPEN) {
            _socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket не подключен');
        }
    };

    const close = (() => {
        if (_socket) {
            _socket.close();
        }
    });

    const emitter = new EventEmitter()

    watch(() => [..._messagesList], (value) => {
        const message = value.pop()

        emitter.emit(message[eventName], message);
    })

    return {send, close, connect, emitter};
}