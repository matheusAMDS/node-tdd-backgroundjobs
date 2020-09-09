import { createConnection, getConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

export default async function createDbConnection() {
  const options = await getConnectionOptions(process.env.NODE_ENV)

  await createConnection({ ...options, name: 'default' })
}