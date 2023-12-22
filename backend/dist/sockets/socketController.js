"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
        const username = `User ${Math.round(Math.random() * 999999)}`;
        socket.emit('name', username);
        socket.on('message', (message) => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleString(),
            });
            app_1.subscriptions.forEach(subscription => {
                (0, app_1.sendNotification)(subscription, { title: 'New Message', body: message });
            });
        });
    });
};
exports.default = handleSocketConnection;
