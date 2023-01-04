import builder from "../builder"
import prisma from "../../db"
import { Db, UnorderedBulkOperation } from "mongodb"
builder.prismaObject("Doubt", {
  fields: (t) => ({
    id: t.exposeID("id"),
    doubtText: t.exposeString("doubtText"),
    doubtPic: t.exposeString("doubtPic", { nullable: true }),
    solution: t.exposeString("solution", { nullable: true }),
    solutionPic: t.exposeString("solutionPic", { nullable: true }),
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
    resolve: (query, root, args, ctx) =>
      prisma.doubt.findMany({
        ...query,
      }),
  })
)

builder.queryField("doubt", (t) =>
  t.prismaField({
    type: "Doubt",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.doubt.findUniqueOrThrow({
        where: {
          id: args.id,
        },
      }),
  })
)

builder.mutationField("createDoubt", (t) =>
  t.prismaField({
    type: "Doubt",
    args: {
      doubtText: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
      doubtPic: t.arg.string(),
    },
    resolve: (query, root, args, ctx) =>
      prisma.doubt.create({
        data: {
          ...args,
        },
      }),
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
      userId: t.arg.string(),
    },
    resolve: (query, root, args, ctx) =>
      prisma.doubt.update({
        where: { id: args.id },
        data: {
          ...args,
          doubtText: args.doubtText ?? undefined,
          userId: args.userId ?? undefined,
        },
      }),
  })
)
