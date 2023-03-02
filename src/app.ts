import { createYoga } from "graphql-yoga"
import { useResponseCache } from "@graphql-yoga/plugin-response-cache"
import builder from "./resolvers"
import { PubSub } from "graphql-yoga"
import { pubsub, PuSubEvents } from "./pubsub"
import { GraphQLError } from "graphql"
import { createVerifier } from "fast-jwt"
import * as dotenv from "dotenv"
import prisma from "./db"
dotenv.config()

import { default as Redis } from "ioredis"
// export const redis = new Redis()
export const redis = new Redis('redis://default:redispw@localhost:49153')
const verifySync = createVerifier({ key: process.env.JWT_SECRET })
export const yoga = createYoga<{
  uid: string
  th: string[]
  pubsub: PubSub<PuSubEvents>
}>({
  schema: builder.toSchema(),
  context: async ({ request }) => {
    try {
      const token = request.headers.get("authorization")
      if (!token) {
        throw new GraphQLError("No token Provided", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const { uid } = verifySync(token)
      let f = await redis.exists(uid)
      if (f) {
        var th = (await redis.get(uid)) ?? []
        // console.log(th)
        return { uid, th }
      } else {
        var t = (
          await prisma.testHistory.findMany({ where: { uid: uid } })
        ).map((i) => i.testId)

        await redis.set(uid, JSON.stringify(t))
        return { uid, th: t, pubsub }
        // return { uid, pubsub }
      }
    } catch (e) {
      throw new GraphQLError(`${e}`, {
        extensions: {
          http: {
            status: 400,
          },
        },
      })
    }
  },
  maskedErrors: {
    maskError: (err, message) => {
      return new GraphQLError(`${err} ${message}`, {
        extensions: {
          http: {
            status: 400,
          },
        },
      })
    },
  },
  plugins: [
    useResponseCache({
      ttl: 5000,
      session: () => null,
    }),
  ],
})
