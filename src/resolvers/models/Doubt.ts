import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"
import { MutationType } from "../../pubsub"
builder.prismaObject("Doubt", {
  fields: (t) => ({
    id: t.exposeID("id"),
    doubtText: t.exposeString("doubtText"),
    doubtPic: t.exposeString("doubtPic", { nullable: true }),
    solution: t.exposeString("solution", { nullable: true }),
    solutionPic: t.exposeString("solutionPic", { nullable: true }),
    resolved: t.exposeBoolean("resolved", { nullable: true }),
    user: t.relation("user"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})

builder.queryField("allDoubts", (t) =>
  t.prismaField({
    type: ["Doubt"],
    resolve: (query, root, args, ctx) => {
      if (ctx.uid !== process.env.ADMIN_ID) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      return prisma.doubt.findMany({
        ...query,
      })
    },
  })
)

builder.queryField("doubtBy", (t) =>
  t.prismaField({
    type: ["Doubt"],
    args: {
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
      const doubts = await prisma.doubt.findMany({
        where: {
          uid: args.uid,
        },
      })
      console.log(doubts)
      if (doubts.length == 0) {
        throw new GraphQLError(`Can't find doubt by ${args.uid}`, {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      return doubts
    },
  })
)

builder.mutationField("createDoubt", (t) =>
  t.prismaField({
    type: "Doubt",
    args: {
      doubtText: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
      doubtPic: t.arg.string(),
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
      const doubt = await prisma.doubt.create({
        data: {
          ...args,
        },
      })
      if (!doubt) {
        throw new GraphQLError("Can't create doubt", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return doubt
    },
  })
)

builder.mutationField("updateDoubt", (t) =>
  t.prismaField({
    type: "Doubt",
    args: {
      id: t.arg.string({ required: true }),
      doubtText: t.arg.string(),
      doubtPic: t.arg.string(),
      solution: t.arg.string(),
      solutionPic: t.arg.string(),
      resolved: t.arg.boolean(),
      uid: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      const doubt = await prisma.doubt.update({
        where: { id: args.id },
        data: {
          doubtText: args.doubtText ?? undefined,
          doubtPic: args.doubtPic ?? undefined,
          solution: args.solution ?? undefined,
          solutionPic: args.solutionPic ?? undefined,
          uid: args.uid ?? undefined,
        },
      })
      if (!doubt) {
        throw new GraphQLError("Can't update doubt", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      ctx.pubsub.publish("doubt", doubt.id, {
        mutationType: MutationType.UPDATED,
        doubt,
      })
      return doubt
    },
  })
)
