import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"
builder.prismaObject("EnrollHistory", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
    courseName: t.exposeString("courseName"),
    price: t.exposeString("price"),
    user: t.relation("user"),
  }),
})

builder.mutationField("createEnrollHistory", (t) =>
  t.prismaField({
    type: "EnrollHistory",
    nullable: false,
    args: {
      date: t.arg({
        type: "Date",
      }),
      courseName: t.arg.string({ required: true }),
      price: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (ctx.uid !== args.uid) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const enrollHistory = await prisma.enrollHistory.create({
        data: {
          ...args,
        },
      })
      if (!enrollHistory) {
        throw new GraphQLError("Can't create enrollHistory", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return enrollHistory
    },
  })
)

builder.queryField("enrollHistoryBy", (t) =>
  t.prismaField({
    type: ["EnrollHistory"],
    nullable: false,
    args: {
      uid: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.enrollHistory.findMany({
        where: {
          uid: args.uid,
        },
      }),
  })
)
