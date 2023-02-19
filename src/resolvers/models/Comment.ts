import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"
builder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    text: t.exposeString("text"),
    video: t.relation("video"),
    user: t.relation("user"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})

builder.mutationField("createComment", (t) =>
  t.prismaField({
    type: "Comment",
    args: {
      text: t.arg.string({required: true}),
      uid: t.arg.string({ required: true }),
      response: t.arg.float({ required: true }),
      vid: t.arg.string({required: true})
    },
    resolve: async (query, root, args, ctx) => {
      if (ctx.uid !== ctx.uid) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const comment = await prisma.comment.create({
        data: {
          ...args,
        },
      })
      return comment
    }
      
  })
)

const UpdateRatingInput = builder.mutationField("updateComment", (t) =>
  t.prismaField({
    type: "Comment",
    args: {
      id: t.arg.string({ required: true }),
      text: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
      vid: t.arg.string({ required: true }),
      date: t.arg({
        type: "Date"
      })
    },
    resolve: async(query, root, args, ctx) => {
      const comment = await prisma.comment.update({
        where: { id: args.id },
        data: {
          ...args,
          date: args.date ?? new Date().toISOString()
        }
      })
      return comment
    }
      
  })
)
