import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

import Queue from './app/lib/Queue'

Queue.process()

console.log('Running Queues')