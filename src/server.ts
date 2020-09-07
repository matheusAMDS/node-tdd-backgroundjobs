import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import BullBoard from 'bull-board'

import Queue from './app/lib/Queue'

import UserController from './app/controllers/UserController'

const PORT = process.env.PORT || 8000
const app = express()

BullBoard.setQueues(Queue.queues.map(queue => queue.bull))

app.use(express.json())
app.use('/admin/queues', BullBoard.UI)

app.post('/users', UserController.store)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))