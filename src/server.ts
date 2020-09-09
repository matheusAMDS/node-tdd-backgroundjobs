import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

import 'reflect-metadata'
import express from 'express'
import BullBoard from 'bull-board'

import createDbConnection from './database/connection'
import Queue from './app/lib/Queue'
import routes from './routes'

createDbConnection().then(_ => {
  const PORT = process.env.PORT || 8000
  const app = express()
  
  BullBoard.setQueues(Queue.queues.map(queue => queue.bull))
  
  app.use(express.json())
  app.use('/admin/queues', BullBoard.UI)
  app.use(routes)
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(error => console.log(error))