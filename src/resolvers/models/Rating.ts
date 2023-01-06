import builder from "../builder"
import prisma from "../../db"
builder.prismaObject("Rating", {
  fields: (t) => ({
    id: t.exposeID("id"),
    test: t.relation("test"),
    user: t.relation("user"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
    response: t.exposeFloat("response"),
  }),
})

builder.mutationField("createRating", (t) =>
  t.prismaField({
    type: "Rating",
    args: {
      testId: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
      response: t.arg.float({ required: true }),
      date: t.arg({
        type: "Date",
      }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.rating.create({
        data: {
          ...args,
        },
      }),
  })
)

const UpdateRatingInput = builder.mutationField("updateRating", (t) =>
  t.prismaField({
    type: "Rating",
    args: {
      id: t.arg.string({ required: true }),
      testId: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
      response: t.arg.float({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.rating.update({
        where: { id: args.id },
        data: {
          ...args,
        },
      }),
  })
)
