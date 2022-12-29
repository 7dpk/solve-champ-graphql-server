import { createYoga } from "graphql-yoga"
import { createServer } from "http"
import builder from "./resolvers"

const yoga = createYoga({
  schema: builder.toSchema(),
})
const server = createServer(yoga)
server.listen(4001, () => console.log("Server is running on localhost:4001"))
// self.addEventListener("fetch", yoga)
