import { crypt } from '../libs/bcrypt'
import { prisma } from '../libs/prisma'

export default class UserServices {
  async create(
    name: string,
    username: string,
    email: string,
    password: string,
  ) {
    const hashedPassword = await crypt.hashPassword(password)

    const data = {
      name,
      username,
      email,
      password: hashedPassword,
    }

    await prisma.user.create({
      data
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } })
  }

  async validateLogin(email: string, password: string) {
    const user = await this.findByEmail(email)
    if (!user) return null

    const isValid = await crypt.comparePassword(password, user.password)

    return isValid ? user : null
  }

  async update(
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
  ) {
    if (password) {
      password = await crypt.hashPassword(password)
    }

    const data = {
      name,
      username,
      email,
      password
    }

    return await prisma.user.update({
      where: { id },
      data,
    })
  }
}
