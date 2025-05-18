import { FastifyInstance } from 'fastify'
import MessageServices from '../services/MessageServices'
import { z } from 'zod'

const messageServices = new MessageServices()

export async function messageRoutes(app: FastifyInstance) {
  app.get('/:id', {
    schema: {
      tags: ['messages'],
      summary: 'Busca uma mensagem pelo ID',
      operationId: 'getMessageById',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          content: z.string(),
          userSenderId: z.string().uuid(),
          conversationId: z.string().uuid(),
          createdAt: z.date(),
        }),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    return messageServices.findById(id)
  })

  app.get('/conversation/:conversationId', {
    schema: {
      tags: ['messages'],
      summary: 'Lista mensagens de uma conversa',
      operationId: 'getMessagesByConversation',
      params: z.object({
        conversationId: z.string().uuid(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          content: z.string(),
          userSenderId: z.string().uuid(),
          conversationId: z.string().uuid(),
          createdAt: z.date(),
        })),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ conversationId: z.string().uuid() })
    const { conversationId } = paramsSchema.parse(request.params)

    return messageServices.findByConversation(conversationId)
  })

  app.post('/', {
    schema: {
      tags: ['messages'],
      summary: 'Envia uma nova mensagem',
      operationId: 'createMessage',
      body: z.object({
        content: z.string(),
        userSenderId: z.string().uuid(),
        conversationId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          id: z.string().uuid(),
          content: z.string(),
          userSenderId: z.string().uuid(),
          conversationId: z.string().uuid(),
          createdAt: z.date(),
        }),
      },
    },
  }, async (request, reply) => {
    const bodySchema = z.object({
      content: z.string(),
      userSenderId: z.string().uuid(),
      conversationId: z.string().uuid()
    })

    const { content, userSenderId, conversationId } = bodySchema.parse(request.body)

    const result = await messageServices.create(content, userSenderId, conversationId)
    return reply.status(201).send(result)
  })

  app.delete('/:id', {
    schema: {
      tags: ['messages'],
      summary: 'Exclui uma mensagem',
      operationId: 'deleteMessage',
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

    await messageServices.delete(id)
    return reply.status(204).send()
  })
}