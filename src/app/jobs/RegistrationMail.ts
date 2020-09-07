import { Job, JobOptions } from 'bull'

import Mail from '../lib/Mail'

interface RegistrationMailData {
  user: {
    name: string;
    email: string;
  }
}

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000
  } as JobOptions,
  async handle({ data }: Job<RegistrationMailData>) {
    const { user } = data

    await Mail.sendMail({
      from: 'Diego Fernandes <queue@test.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá ${user.name}, bem-vindo ao sistema de filas.`
    })
  }, 
}