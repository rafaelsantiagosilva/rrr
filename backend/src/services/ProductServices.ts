import { prisma } from '../libs/prisma'

export default class ProductServices {
  async create(name: string, description: string, category: string, userId: string) {
    return await prisma.product.create({
      data: { name, description, category, userId }
    })
  }

  async findById(id: string) {
    return await prisma.product.findUnique({ where: { id } })
  }

  async findAllAndSortInDateDesc() {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async delete(id: string) {
    return await prisma.product.delete({ where: { id } })
  }

  async findByUser(userId: string) {
    return await prisma.product.findMany({ where: { userId } })
  }

  async update(id: string, name: string, description: string, category: string) {
    return await prisma.product.update({
      where: { id },
      data: { name, description, category }
    })
  }
}
