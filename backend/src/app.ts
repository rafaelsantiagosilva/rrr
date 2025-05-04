import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify, { FastifyInstance } from 'fastify'

import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { writeFile } from 'fs/promises'
import { join, resolve } from 'path'

function createSwaggerJson(app: FastifyInstance) {
  const spec = app.swagger();
  const ROOT_PATH = join(__dirname, '..');
  const FILE_NAME = "swagger.json";

  writeFile(resolve(ROOT_PATH, FILE_NAME), JSON.stringify(spec, null, 2), "utf8");
}

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'RRR Server',
      version: 'MVP',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
})

app.ready().then(() => {
  createSwaggerJson(app);
});

export { app }

