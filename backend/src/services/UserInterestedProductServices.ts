import { prisma } from '../libs/prisma'

export default class UserInterestedProductServices {
  async create(userId: string, productId: string) {
    return await prisma.userInterestedProduct.create({
      data: { userId, productId }
    })
  }

  async delete(id: string) {
    return await prisma.userInterestedProduct.delete({ where: { id } })
  }

  async findByUser(userId: string) {
    return await prisma.userInterestedProduct.findMany({ where: { userId } })
  }

  async findByProduct(productId: string) {
    return await prisma.userInterestedProduct.findMany({ where: { productId } })
  }
}
