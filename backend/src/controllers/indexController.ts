import { type Request, type Response } from 'express'

class IndexController {
  public static async getHelloWorld (req: Request, res: Response) {
    res.status(201).json('Hello World!')
  }
}

export default IndexController
