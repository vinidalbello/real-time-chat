import { subscriptions, vapidKeys } from '../services/webpush.service'
import { type Request, type Response } from 'express'

class WebPushController {
  static async getSubscription (req: Request, res: Response) {
    const subscription = req.body
    const id = Date.now().toString()
    subscriptions.set(id, subscription)
    res.status(201).json({ id })
  }

  static async sendVapidPublicKey (req: Request, res: Response) {
    res.send(vapidKeys.publicKey)
  }
}

export default WebPushController
