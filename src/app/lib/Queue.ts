import Queue from 'bull'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs'

interface QueueHandler {
  bull: Queue.Queue;
  key: string;
  options: Queue.JobOptions;
  handle: (data: Queue.Job) => Promise<void>
}

const queues: QueueHandler[] = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, { redis: redisConfig }),
  key: job.key,
  handle: job.handle,
  options: job.options
}))

class QueueManager {
  queues: QueueHandler[]

  constructor(queues: QueueHandler[]) {
    this.queues = queues
  }

  public add(name: string, data: any) {
    const queue = this.queues.find(queue => queue.key === name)

    return queue?.bull.add(data, queue.options)
  }

  public process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, error) => {
        console.log('Job Failer', queue.key, job.data)
        console.log(error)
      })
    })
  }
}

export default new QueueManager(queues)