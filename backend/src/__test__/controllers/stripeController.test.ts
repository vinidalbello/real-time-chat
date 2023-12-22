import request from 'supertest'
import httpServer from '../../app'

describe('StripeController', () => {
  it('should create a checkout session successfully', async () => {
    const response = await request(httpServer).post('/checkout').send({
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 2 }
      ]
    })

    expect(response.status).toBe(200)
    expect(response.body.url).toBeDefined()
  })
})
