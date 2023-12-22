import { type Server, type Socket } from 'socket.io'
import { sendNotification, subscriptions } from '../services/webpush.service'

const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const username = `User ${Math.round(Math.random() * 999999)}`
    socket.emit('name', username)

    socket.on('message', (message: string) => {
      io.emit('message', {
        from: username,
        message,
        time: new Date().toLocaleString()
      })
      subscriptions.forEach(subscription => {
        sendNotification(subscription, { title: 'New Message', body: message })
      })
    })
  })
}

export default handleSocketConnection
