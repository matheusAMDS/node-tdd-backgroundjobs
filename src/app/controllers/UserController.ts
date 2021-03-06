import { Request, Response } from 'express'

import Queue from '../lib/Queue'

class UserController {
  public async store(req: Request, res: Response) {
    const { name, email, password } = req.body
    const user = {
      name,
      email,
      password 
    }

    await Queue.add('RegistrationMail', { user })

    return res.json({ user })
  }
}

export default new UserController()