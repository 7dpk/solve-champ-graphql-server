import { createYoga } from "graphql-yoga"
import { useResponseCache } from "@graphql-yoga/plugin-response-cache"
import builder from "./resolvers"
import { pubsub } from "./pubsub"
import { GraphQLError } from "graphql"
export const yoga = createYoga({
  schema: builder.toSchema(),
  context: () => ({ pubsub }),
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
      session: () => null,
    }),
  ],
})
