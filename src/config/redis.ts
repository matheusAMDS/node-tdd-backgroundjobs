export default {
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT)
}