import { yoga } from "./app"
import { createServer } from "http"


const server = createServer(yoga)

server.listen(4001, () => console.log("Server is running on localhost:4001"))
// self.addEventListener("fetch", yoga)
