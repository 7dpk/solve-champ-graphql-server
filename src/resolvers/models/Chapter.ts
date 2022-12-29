import builder from "../builder"
import prisma from "../../db"

builder.prismaObject("Chapter", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    logoUrl: t.exposeString("logo", { nullable: true }),
    class: t.exposeString("class"),
    subject: t.exposeString("subject"),
    board: t.exposeString("board"),
    testCount: t.relationCount("tests"),
    tests: t.relation("tests"),
    freeTestCount: t.relationCount("tests", {
      where: {
        paid: false,
      },
    }),
  }),
})

builder.mutationField("createChapter", (t) =>
  t.prismaField({
    type: "Chapter",
    args: {
      name: t.arg.string({ required: true }),
      logo: t.arg.string(),
      class: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      board: t.arg.string({ required: true }),
      testIds: t.arg.stringList({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.chapter.create({
        data: {
          ...args,
        },
      }),
  })
)
