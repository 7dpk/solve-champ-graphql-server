import builder from "../builder"
import prisma from "../../db"
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
      date: t.arg.string({ required: true }),
      courseName: t.arg.string({ required: true }),
      price: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.enrollHistory.create({
        data: {
          ...args,
        },
      }),
  })
)
