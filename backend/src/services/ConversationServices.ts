import { prisma } from '../libs/prisma'

export default class ConversationServices {
  async create(user1Id: string, user2Id: string) {
    return await prisma.conversation.create({
      data: { user1Id, user2Id }
    })
  }

  async findById(id: string) {
    return await prisma.conversation.findUnique({ where: { id } })
  }

  async findByUser(userId: string) {
    return await prisma.conversation.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }]
      }
    })
  }

  async findConversationByUsersId(user1Id: string, user2Id: string) {
    return await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            user1Id,
            user2Id,
          },
          {
            user1Id: user2Id,
            user2Id: user1Id,
          },
        ],
      },
    });
  }

  async delete(id: string) {
    return await prisma.conversation.delete({ where: { id } })
  }
}
