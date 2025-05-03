import { prisma } from '../libs/prisma'

export default class MessageServices {
  async create(content: string, userSenderId: string, conversationId: string) {
    return await prisma.message.create({
      data: { content, userSenderId, conversationId }
    })
  }

  async findByConversation(conversationId: string) {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    })
  }

  async delete(id: string) {
    return await prisma.message.delete({ where: { id } })
  }

  async findById(id: string) {
    return await prisma.message.findUnique({ where: { id } })
  }
}
