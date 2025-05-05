import { FastifyInstance } from 'fastify'
import UserInterestedProductServices from '../services/UserInterestedProductServices'
import { z } from 'zod'

const userInterestedProductServices = new UserInterestedProductServices()

export async function userInterestedProductRoutes(app: FastifyInstance) {
  app.get('/user/:userId', {
    schema: {
      tags: ['userInterestedProduct'],
      summary: 'Produtos que um usuário demonstrou interesse',
      description: 'Lista todos os produtos marcados como interessante por um usuário.',
      operationId: 'getInterestsByUser',
      params: z.object({
        userId: z.string().uuid(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          productId: z.string().uuid(),
          createdAt: z.date(),
        })),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ userId: z.string().uuid() })
    const { userId } = paramsSchema.parse(request.params)

    return userInterestedProductServices.findByUser(userId)
  })

  app.get('/product/:productId', {
    schema: {
      tags: ['userInterestedProduct'],
      summary: 'Usuários interessados em um produto',
      description: 'Lista todos os usuários que demonstraram interesse em um determinado produto.',
      operationId: 'getInterestsByProduct',
      params: z.object({
        productId: z.string().uuid(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          productId: z.string().uuid(),
          createdAt: z.date(),
        })),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ productId: z.string().uuid() })
    const { productId } = paramsSchema.parse(request.params)

    return userInterestedProductServices.findByProduct(productId)
  })

  app.post('/', {
    schema: {
      tags: ['userInterestedProduct'],
      summary: 'Cria um interesse entre usuário e produto',
      description: 'Registra o interesse de um usuário por um produto.',
      operationId: 'createUserInterest',
      body: z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          productId: z.string().uuid(),
          createdAt: z.date(),
        }),
      },
    },
  }, async (request, reply) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      productId: z.string().uuid()
    })

    const { userId, productId } = bodySchema.parse(request.body)

    const result = await userInterestedProductServices.create(userId, productId)
    return reply.status(201).send(result)
  })

  app.delete('/:id', {
    schema: {
      tags: ['userInterestedProduct'],
      summary: 'Remove um interesse',
      description: 'Apaga o interesse de um usuário por um produto.',
      operationId: 'deleteUserInterest',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        204: z.object({
          description: z.literal('Interesse removido com sucesso. Sem conteúdo retornado.'),
          type: z.literal('null'),
        }),
      },
    },
  }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    await userInterestedProductServices.delete(id)
    return reply.status(204).send()
  })
}
