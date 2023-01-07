import { yoga } from "../app"
import { createServer, Server } from "http"
import { AddressInfo } from "net"
import { fetch } from "@whatwg-node/fetch"

let server: Server
let port: number

beforeAll(async () => {
  server = createServer(yoga)
  await new Promise<void>((resolve) => server.listen(0, resolve))
  port = (server.address() as AddressInfo).port
})
afterAll(async () => {
  await new Promise(async (resolve) => await server.close(resolve))
})

describe("Basic Tests", () => {
  it("should execute greetings field", async () => {
    const response = await fetch(
      `http://localhost:${port}/graphql?query=query{greetings}`
    )
    const body = await response.json()
    expect(body.errors).toBeUndefined()
    expect(body.data).toEqual({ greetings: "Hello World!" })
  })
  it("should fetch user by uid", async () => {
    const response = await fetch(
      `http://localhost:${port}/graphql?query=query{user(uid:"8XAqyhLXApaJz6kHznuBapMJtYL9"){name}}`
    )
    const body = await response.json()
    expect(body.errors).toBeUndefined()
    expect(body.data).toEqual({ user: { name: "aashutosh maharaj " } })
  })
})
