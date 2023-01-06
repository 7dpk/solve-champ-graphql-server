import { createYoga } from "graphql-yoga"
import { createServer } from "http"
import builder from "./resolvers"
import { pubsub } from "./pubsub"

const yoga = createYoga({
  schema: builder.toSchema(),
  context: () => ({ pubsub }),
})
const server = createServer(yoga)
server.listen(4001, () => console.log("Server is running on localhost:4001"))
// self.addEventListener("fetch", yoga)
