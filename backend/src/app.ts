import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './routes/routes';
import handleSocketConnection from './controllers/socketController';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(cors());
app.use(router);

handleSocketConnection(io);

export default httpServer;