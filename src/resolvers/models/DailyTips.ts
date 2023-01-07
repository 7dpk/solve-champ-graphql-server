import builder from "../builder"
import prisma from "../../db"
import { DateTime } from "graphql-scalars/typings/mocks"
import { GraphQLError } from "graphql"
builder.prismaObject("DailyTips", {
  fields: (t) => ({
    id: t.exposeID("id"),
    videoId: t.exposeString("videoId"),
    header: t.exposeString("header"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
    bgcolor: t.exposeString("bgcolor", { nullable: true }),
    imgUrl: t.exposeString("imgUrl"),
  }),
})

builder.queryField("dailyTips", (t) =>
  t.prismaField({
    type: "DailyTips",
    nullable: true,
    args: {
      date: t.arg({
        type: "Date",
        required: true,
      }),
    },
    resolve: (query, _, args, ctx) =>
      prisma.dailyTips.findFirstOrThrow({
        where: {
          date: {
            lte: args.date,
          },
        },
      }),
  })
)

builder.queryField("allDailyTips", (t) =>
  t.prismaField({
    type: ["DailyTips"],
    nullable: true,
    resolve: (query, _, args, ctx) => prisma.dailyTips.findMany(),
  })
)

builder.mutationField("createDailyTips", (t) =>
  t.prismaField({
    type: "DailyTips",
    args: {
      videoId: t.arg.string({ required: true }),
      header: t.arg.string({ required: true }),
      bgcolor: t.arg.string(),
      imgUrl: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const dailyTips = await prisma.dailyTips.create({
        data: {
          ...args,
        },
      })
      if (!dailyTips) {
        throw new GraphQLError("Can't create dailyTips", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return dailyTips
    },
  })
)
