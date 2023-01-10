import { createYoga } from "graphql-yoga"
import { useResponseCache } from "@graphql-yoga/plugin-response-cache"
import builder from "./resolvers"
import { pubsub } from "./pubsub"
import { GraphQLError } from "graphql"
import { createVerifier } from "fast-jwt"
import * as dotenv from "dotenv"
import prisma from "./db"
dotenv.config()

const verifySync = createVerifier({ key: process.env.JWT_SECRET })
export const yoga = createYoga<{ uid: string; th: string[] }>({
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
      const th = await prisma.testHistory.findMany({ where: { uid: uid } })
      console.log(uid, th)
      return { uid, th, pubsub }
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
      return new GraphQLError(`Error: ${err} Message: ${message}`, {
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
