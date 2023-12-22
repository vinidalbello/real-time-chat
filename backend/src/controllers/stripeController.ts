import Stripe from 'stripe'
import { type Request, type Response } from 'express'

const stripePrivateKey: string = 'sk_test_51OKkn8IRW3nLNxiwBpTXXvMFvK54mInI0C9d24yF2c7zq3bmZCkjFD2WyX5oYbeah34XgphoyZidZ0VDlzlyi6Pc003goEVB2H'

export const stripe = new Stripe(stripePrivateKey, { apiVersion: '2023-10-16', typescript: true })

// Aqui é aonde vai os dados do produto/Banco de dados
const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Item 1 teste' }],
  [2, { priceInCents: 20000, name: 'Item 2 teste' }]
])

export default class StripeController {
  public static async createTheRequestForStripe (req: Request, res: Response) {
    try {
      const lineItems = req.body.items.map((item: any) => {
        const storeItem = storeItems.get(item.id)
        if (!storeItem) {
          throw new Error(`Item with ID ${item.id} not found.`)
        }

        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: 'http://localhost:5173/checkout/success',
        cancel_url: 'http://localhost:5173/checkout/reject'
      })

      res.json({ url: session.url })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }
}
