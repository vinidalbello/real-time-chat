"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./routes/routes"));
const socketController_1 = __importDefault(require("./controllers/socketController"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    },
});
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(routes_1.default);
(0, socketController_1.default)(io);
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
