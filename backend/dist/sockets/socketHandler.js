"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
server_1.io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
});
