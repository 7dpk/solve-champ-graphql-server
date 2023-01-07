import { yoga } from "../src/app"
import { createServer, Server } from "http"
import { AddressInfo } from "net"
import { fetch } from "@whatwg-node/fetch"
import { randomBytes } from "crypto"
import prisma from "../src/db"
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
  //create user test
  it("should be able to create user and fetch information", async () => {
    const uid = randomBytes(14).toString("hex")
    const response = await fetch(
      `http://localhost:${port}/graphql?query=mutation {createUser(uid: \"${uid}\",board: "BSEB",language:"en",mobile: "9898989898",name: "demo user",schoolName: "demo school",studentClass: "10"){uid}}`
    )
    const body = await response.json()
    expect(body.errors).toBeUndefined()
    expect(body.data).toEqual({ createUser: { uid: uid } })
    await prisma.user.delete({
      where: {
        uid: uid,
      },
    })
  })
})
