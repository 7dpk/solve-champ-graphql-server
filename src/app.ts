import { createYoga } from "graphql-yoga"
import builder from "./resolvers"
import { pubsub } from "./pubsub"
import { GraphQLError } from "graphql"
import { MaskError } from "graphql-yoga"
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
})
