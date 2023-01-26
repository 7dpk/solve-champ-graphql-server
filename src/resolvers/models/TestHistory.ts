import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"
import { redis } from '../../app'
builder.prismaObject("TestHistory", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userResponses: t.exposeIntList("userResponses"),
    correctResponses: t.exposeIntList("correctResponses"),
    user: t.relation("user"),
    test: t.relation("test"),
    createdAt: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})
builder.mutationField("createTestHistory", (t) =>
  t.prismaField({
    type: "TestHistory",
    nullable: false,
    args: {
      testId: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
      date: t.arg({
        type: "Date",
      }),
      userResponses: t.arg.intList({ required: true }),
      correctResponses: t.arg.intList({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const testHistory = await prisma.testHistory.create({
        data: {
          ...args,
        },
      })
      if (!testHistory) {
        throw new GraphQLError("Can't create test history", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      await redis.del(args.uid)
      return testHistory
    },
  })
)

builder.queryField("testHistoryBy", (t) =>
  t.prismaField({
    type: ["TestHistory"],
    nullable: true,
    args: {
      uid: t.arg.string(),
      testId: t.arg.string(),
    },
    resolve: (query, root, args, ctx) => {
      if (ctx.uid !== args.uid) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      return prisma.testHistory.findMany({
        where: {
          uid: args.uid ?? undefined,
          testId: args.testId ?? undefined,
        },
      })
    },
  })
)
