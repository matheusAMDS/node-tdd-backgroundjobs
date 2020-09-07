import { Job, JobOptions } from 'bull'

import Mail from '../lib/Mail'

interface ForgotPasswordMailData {
  email: string;
}

export default {
  key: 'ForgotPasswordMail',
  options: {} as JobOptions,
  async handle({ data }: Job<ForgotPasswordMailData>) {
    const { email } = data

    await Mail.sendMail({
      from: 'Diego Fernandes <queue@test.com.br>',
      to: `<${email}>`,
      subject: 'Redefinir senha',
      html: `Olá, parece que você esqueceu sua senha...burro.`
    })
  }
}