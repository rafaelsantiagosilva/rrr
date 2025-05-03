import { FastifyInstance } from 'fastify'
import ProductServices from '../services/ProductServices'
import { z } from 'zod'

const productServices = new ProductServices()

export async function productRoutes(app: FastifyInstance) {
  app.get('/', {
    schema: {
      tags: ['products'],
      summary: 'Lista todos os produtos em ordem decrescente de data',
      description: 'Retorna uma lista com todos os produtos cadastrados ordem decrescente de data.',
      operationId: 'listProducts',
      // response: {
      //   200: z.array(
      //     z.object({
      //       id: z.string().uuid(),
      //       name: z.string().min(1),
      //       description: z.string().min(1),
      //       category: z.string().min(1),
      //       createdAt: z.string(),
      //       userId: z.string().uuid(),
      //     })
      //   )
      // },
    },
  }, async () => {
    return await productServices.findAllAndSortInDateDesc()
  })

  app.get('/:id', {
    schema: {
      tags: ['products'],
      summary: 'Retorna um produto por ID',
      description: 'Retorna os dados de um produto específico.',
      operationId: 'getProductById',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          name: z.string(),
          description: z.string(),
          category: z.string(),
          location: z.string(),
          createdAt: z.string(),
          userId: z.string().uuid(),
        }),
      },
    },
  }, async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    return await productServices.findById(id)
  })

  app.get('/user/:userId', {
    schema: {
      tags: ['products'],
      summary: 'Retorna os produtos postados por um usuário',
      description: 'Retorna os produtos postados por um usuário com base no ID deste.',
      operationId: 'getProductsByUserId',
      params: z.object({
        userId: z.string().uuid()
      }),
      // response: {
      //   201: z.object({
      //     message: z.literal('Product created'),
      //   }),
      // },
    },
  }, async (request) => {
    const paramsSchema = z.object({ userId: z.string().uuid() })
    const { userId } = paramsSchema.parse(request.params)

    return await productServices.findByUser(userId)
  })

  app.post('/', {
    schema: {
      tags: ['products'],
      summary: 'Cria um novo produto',
      description: 'Cria um novo produto com nome, descrição, categoria e local.',
      operationId: 'createProduct',
      body: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        userId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          message: z.literal('Product created'),
        }),
      },
    },
  }, async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      category: z.string(),
      userId: z.string().uuid()
    })

    const { name, description, category, userId } = bodySchema.parse(request.body)

    const product = await productServices.create(name, description, category, userId)
    return reply.status(201).send({ message: 'Product created' })
  })

  app.put('/:id', {
    schema: {
      tags: ['products'],
      summary: 'Atualiza um produto',
      description: 'Edita os dados de um produto existente.',
      operationId: 'updateProduct',
      params: z.object({
        id: z.string().uuid(),
      }),
      body: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
      }),
      response: {
        204: z.object({
          description: z.literal('Produto atualizado com sucesso. Sem conteúdo retornado.'),
          type: z.literal('null'),
        }),
      },
    },
  }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      category: z.string()
    })

    const { name, description, category } = bodySchema.parse(request.body)

    await productServices.update(id, name, description, category)
    return reply.status(204).send()
  })

  app.delete('/:id', {
    schema: {
      tags: ['products'],
      summary: 'Deleta um produto',
      description: 'Deleta um produto pelo ID.',
      operationId: 'deleteProduct',
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

    await productServices.delete(id)
    return reply.status(204).send()
  })
}
