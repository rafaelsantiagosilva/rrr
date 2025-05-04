import { MultipartFile } from '@fastify/multipart'
import { createWriteStream, mkdirSync } from 'fs'
import { extname, join, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { crypt } from '../libs/bcrypt'
import { prisma } from '../libs/prisma'

export default class UserServices {
  private pump

  constructor() {
    this.pump = promisify(pipeline)
  }

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

  async saveProfileImage(data: MultipartFile, userId: string) {
    const uploadDir = resolve(__dirname, '..', '..', 'uploads', 'users', userId)
    mkdirSync(uploadDir, { recursive: true })

    const fileExtension = extname(data.filename)
    const filePath = join(uploadDir, `profile${fileExtension}`)

    await this.pump(data.file, createWriteStream(filePath))
  }
}
