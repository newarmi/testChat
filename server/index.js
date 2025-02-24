// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({
    server,
    maxPayload: 1024 * 1024,
    clientTracking: true,
});

// Конфигурация heartbeat
const HEARTBEAT_INTERVAL = 30000;
const CONNECTION_TIMEOUT = 60000;

wss.on('connection', (ws, req) => {
    ws.isAlive = true;
    ws.ip = req.socket.remoteAddress;
    ws.lastActivity = Date.now();

    // Настройка обработчиков событий
    ws.on('pong', () => {
        ws.isAlive = true;
        ws.lastActivity = Date.now();
    });

    const heartbeat = setInterval(() => {
        if (Date.now() - ws.lastActivity > CONNECTION_TIMEOUT) {
            ws.terminate();
            return;
        }

        if (!ws.isAlive) {
            ws.terminate();
            return;
        }

        ws.isAlive = false;
        ws.ping(null, false, (err) => {
            if (err) {
                console.error('Ошибка при отправке ping:', err);
                ws.terminate();
            }
        });
    }, HEARTBEAT_INTERVAL);

    // Обработка сообщений
    ws.on('message', (binMessage) => {
        const message = binMessage.toString()
        try {
            ws.lastActivity = Date.now();

            // Валидация сообщения
            if (typeof message !== 'string') {
                throw new Error('Неверный формат сообщения');
            }

            if (message.length > 4096) {
                throw new Error('Сообщение слишком длинное');
            }

            // Рассылка сообщения
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message, (err) => {
                        if (err) console.error('Ошибка отправки:', err);
                    });
                }
            });
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error.message);
            ws.send(`Ошибка: ${error.message}`);
        }
    });

    // Обработка закрытия соединения
    ws.on('close', (code, reason) => {
        clearInterval(heartbeat);
        console.log(`Соединение закрыто (код: ${code}, причина: ${reason || 'нет'})`);
    });

    // Обработка ошибок
    ws.on('error', (error) => {
        console.error('WebSocket ошибка:', error.message);
        ws.close(1011, 'Internal error');
    });
});

// Graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
    console.log('Завершение работы сервера...');

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.close(1001, 'Server shutdown');
        }
    });

    server.close(() => {
        console.log('Сервер остановлен');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Принудительное завершение');
        process.exit(1);
    }, 10000);
}

// Запуск сервера
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на ${HOST}:${PORT}`);
    console.log(`Текущее время: ${new Date().toISOString()}`);
});