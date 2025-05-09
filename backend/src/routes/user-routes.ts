import { FastifyInstance } from 'fastify'
import UserUseCases from '../services/UserServices'
import { compare } from 'bcrypt'
import { z } from 'zod'

const userUseCases = new UserUseCases()

export async function userRoutes(app: FastifyInstance) {
  app.get('/:id', {
    schema: {
      tags: ['users'],
      description: 'Retorna as informações de um usuário com determinado ID.',
      summary: 'Buscar usuário por ID',
      operationId: 'getUserById',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          name: z.string(),
          username: z.string(),
          email: z.string().email(),
          whatsappNumber: z.string().nullable(),
          cnpj: z.string().nullable(),
          type: z.union([z.literal('PF'), z.literal('PJ')]).nullable(),
        }),
        404: z.object({
          error: z.string()
        })
      }
    }
  }, async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    return await userUseCases.findById(id)
  })

  app.post('/register', {
    schema: {
      tags: ['users'],
      description: 'Cria um novo usuário no banco de dados.',
      summary: 'Registro de usuário',
      operationId: 'createUser',
      body: z.object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        whatsappNumber: z.string().nullable(),
        cnpj: z.string().nullable(),
        password: z.string().min(6),
        type: z.union([z.literal('PF'), z.literal('PJ')]).nullable()
      }),
      response: {
        201: z.void(),
        400: z.object({
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      whatsappNumber: z.string().nullable(),
      cnpj: z.string().nullable(),
      password: z.string().min(6),
      type: z.literal("PF").or(
        z.literal("PJ")
      ).nullable()
    })

    const { name, username, email, whatsappNumber, cnpj, password, type } = bodySchema.parse(request.body)

    try {
      await userUseCases.create(name, username, email, whatsappNumber, cnpj, password, type)
      return reply.status(201).send()
    } catch (err) {
      return reply.status(400).send({ error: 'User already exists or invalid data.' })
    }
  })

  app.post('/login', {
    schema: {
      tags: ['users'],
      description: 'Realiza login de um usuário com email e senha.',
      summary: 'Login de usuário',
      operationId: 'loginUser',
      body: z.object({
        email: z.string().email(),
        password: z.string()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          name: z.string(),
          username: z.string(),
          email: z.string().email(),
          whatsappNumber: z.string().nullable(),
          cnpj: z.string().nullable(),
          type: z.union([z.literal('PF'), z.literal('PJ')]).nullable(),
        }),
        404: z.object({
          error: z.string()
        }),
        500: z.object({
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { email, password } = bodySchema.parse(request.body)

    try {
      const user = await userUseCases.findByEmail(email)

      if (user && await compare(password, user.password))
        return user;

      return reply.status(404).send({ error: 'User not found' })
    } catch (err) {
      return reply.status(500).send({ error: 'Error!' })
    }
  })

  app.put('/:id', {
    schema: {
      tags: ['users'],
      description: 'Atualiza os dados de um usuário com base no ID.',
      summary: 'Atualizar usuário',
      operationId: 'updateUser',
      params: z.object({
        id: z.string().uuid()
      }),
      body: z.object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        whatsappNumber: z.string().nullable(),
        cnpj: z.string().nullable(),
        password: z.string().min(6),
        type: z.union([z.literal("PF"), z.literal("PJ")]).nullable()
      }),
      response: {
        204: z.void(),
        400: z.object({
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      whatsappNumber: z.string().nullable(),
      cnpj: z.string().nullable(),
      password: z.string().min(6),
      type: z.literal("PF").or(
        z.literal("PJ")
      ).nullable()
    })

    const { name, username, email, whatsappNumber, cnpj, password, type } = bodySchema.parse(request.body)

    try {
      await userUseCases.update(id, name, username, email, whatsappNumber, cnpj, password, type)
      return reply.status(204).send()
    } catch (err) {
      return reply.status(400).send({ error: 'User already exists or invalid data.' })
    }
  })

  app.delete('/:id', {
    schema: {
      tags: ['users'],
      description: 'Remove um usuário do banco de dados pelo ID.',
      summary: 'Deletar usuário',
      operationId: 'deleteUser',
      params: z.object({
        id: z.string().uuid()
      }),
      response: {
        204: z.void()
      }
    }
  }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    await userUseCases.delete(id)
    return reply.status(204).send()
  })
}