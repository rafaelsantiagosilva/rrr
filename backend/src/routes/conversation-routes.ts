import { FastifyInstance } from 'fastify'
import ConversationServices from '../services/ConversationServices'
import { z } from 'zod'

const conversationServices = new ConversationServices()

export async function conversationRoutes(app: FastifyInstance) {
  app.get('/:id', {
    schema: {
      tags: ['conversations'],
      summary: 'Busca uma conversa pelo ID',
      operationId: 'getConversationById',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          user1Id: z.string().uuid(),
          user2Id: z.string().uuid(),
          createdAt: z.string(),
        }),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    return conversationServices.findById(id)
  })

  app.get('/user/:userId', {
    schema: {
      tags: ['conversations'],
      summary: 'Lista conversas de um usuário',
      operationId: 'getConversationsByUser',
      params: z.object({
        userId: z.string().uuid(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          user1Id: z.string().uuid(),
          user2Id: z.string().uuid(),
          createdAt: z.string(),
        })),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ userId: z.string().uuid() })
    const { userId } = paramsSchema.parse(request.params)

    return conversationServices.findByUser(userId)
  })

  app.get('/by-users/:user1Id/:user2Id', {
    schema: {
      tags: ['conversations'],
      summary: 'Busca uma conversa entre dois usuários',
      operationId: 'getConversationByUsers',
      params: z.object({
        user1Id: z.string().uuid(),
        user2Id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          user1Id: z.string().uuid(),
          user2Id: z.string().uuid(),
          createdAt: z.date(),
        }).nullable(), // pode não existir
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({
      user1Id: z.string().uuid(),
      user2Id: z.string().uuid(),
    })

    const { user1Id, user2Id } = paramsSchema.parse(request.params)

    return await conversationServices.findConversationByUsersId(user1Id, user2Id)
  })


  app.post('/', {
    schema: {
      tags: ['conversations'],
      summary: 'Cria uma nova conversa entre dois usuários',
      operationId: 'createConversation',
      body: z.object({
        user1Id: z.string().uuid(),
        user2Id: z.string().uuid(),
      }),
      response: {
        201: z.object({
          id: z.string().uuid(),
          user1Id: z.string().uuid(),
          user2Id: z.string().uuid(),
          createdAt: z.date(),
        }),
      },
    },
  }, async (request, reply) => {
    const bodySchema = z.object({
      user1Id: z.string().uuid(),
      user2Id: z.string().uuid()
    })

    const { user1Id, user2Id } = bodySchema.parse(request.body)

    const result = await conversationServices.create(user1Id, user2Id)
    console.log(result);
    return reply.status(201).send(result)
  })

  app.delete('/:id', {
    schema: {
      tags: ['conversations'],
      summary: 'Exclui uma conversa',
      operationId: 'deleteConversation',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        204: z.void(),
      },
    },
  }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    await conversationServices.delete(id)
    return reply.status(204).send()
  })
}


