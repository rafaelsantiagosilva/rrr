import { app } from "./app"
import { conversationRoutes } from "./routes/conversation-routes";
import { messageRoutes } from "./routes/message-routes";
import { productRoutes } from "./routes/product-routes";
import { userInterestedProductRoutes } from "./routes/user-interested-product-routes";
import { userRoutes } from "./routes/user-routes";

async function start() {
  app.register(userRoutes, { prefix: '/users' })
  app.register(productRoutes, { prefix: '/products' })
  app.register(userInterestedProductRoutes, { prefix: '/user-interested-products' })
  app.register(conversationRoutes, { prefix: '/conversations' })
  app.register(messageRoutes, { prefix: '/messages' })

  app.listen({ port: 3333 }, (error, address) => {
    if (error) {
      console.error(`> Error in HTTP server start: ${error}`)
      return
    }

    console.log(`> HTTP Server running on: ${address}`);
    console.info(`> Docs: ${address}/api-docs`);
  })
}

start();
