import prisma from "../../db"
import builder from "../builder"
import { GraphQLError } from "graphql"
builder.prismaObject("Video", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    url: t.exposeString("url"),
    tags: t.exposeStringList("tags"),  
    videoClass: t.exposeString("videoClass"),
    board: t.exposeString("board"),
    subject: t.exposeString("subject"),
    paid: t.exposeBoolean("paid"),
    createdAt: t.expose("createdAt", {
      type: "Date",
      nullable: true,
    }),
    chapter: t.relation("chapter"),
    comments: t.relation("Comments"),
    commentCount: t.relationCount("Comments")
  }),
})

builder.mutationField("createVideo", (t) =>
  t.prismaField({
    type: "Video",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      url: t.arg.string({required: true}),
      tags: t.arg.stringList(),
      rating: t.arg.float({
        validate: {
          type: "number",
          min: 1.0,
          max: 5.0,
        },
      }),
      videoClass: t.arg.string({required: true}),
      board: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      paid: t.arg.boolean({ required: true }),
      chapterId: t.arg.string({ required: true }),
      createdAt: t.arg({
        type: "Date",
      }),
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
      const video = await prisma.video.create({
        data: {
          ...args,
          tags: args.tags ?? []
        },
      })
      if (!video) {
        throw new GraphQLError("Can't create video", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return video
    },
  })
)

