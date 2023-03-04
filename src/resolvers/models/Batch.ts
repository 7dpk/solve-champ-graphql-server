import prisma from "../../db"
import builder from "../builder"
import { GraphQLError } from "graphql"
builder.prismaObject("Batch", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    picUrl: t.exposeString("picUrl"),
    batchCode: t.exposeString("batchCode"),
    subject: t.exposeString("subject"),
    board: t.exposeString("board"),
    teachers: t.exposeStringList("teachers"),
    price: t.exposeInt("price"),
    createdAt: t.expose("createdAt", {
      type: "Date",
      nullable: true,
    }),
    users: t.relation("users"),
    usersCount: t.relationCount("users"),
    video: t.relation("videos"),
    videoCount: t.int({ resolve: (batch) => batch.videoIds.length }),
    enrollHistory: t.relation("enrollHistories"),
    enrolHistoryCount: t.relationCount("enrollHistories"),
  }),
})

builder.mutationField("createBatch", (t) =>
  t.prismaField({
    type: "Batch",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      picUrl: t.arg.string({ required: true }),
      batchCode: t.arg.string({ required: true }),
      class: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      board: t.arg.string({ required: true }),
      teachers: t.arg.stringList({ required: true }),
      price: t.arg.int({ required: true }),
      startDate: t.arg({ type: "Date" }),
      endDate: t.arg({ type: "Date" }),
      createdAt: t.arg({
        type: "Date",
      }),
      videoIds: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (ctx.uid !== process.env.ADMIN_ID) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const batch = await prisma.batch.create({
        data: {
          ...args,
          userIds: [],
        },
      })
      if (!batch) {
        throw new GraphQLError("Can't create batch", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return batch
    },
  })
)
