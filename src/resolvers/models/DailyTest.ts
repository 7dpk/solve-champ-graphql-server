import prisma from "../../db"
import builder from "../builder"

builder.prismaObject("DailyTest", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    testClass: t.exposeString("testClass"),
    board: t.exposeString("board"),
    subject: t.exposeString("subject"),
    questions: t.relation("questions"),
    questionCount: t.int({
      resolve: (test) => test.questionIds.length,
    }),
    createdAt: t.expose("createdAt", {
      type: "Date",
      nullable: true,
    }),
  }),
})

builder.mutationField("createDailyTest", (t) =>
  t.prismaField({
    type: "DailyTest",
    args: {
      name: t.arg.string({ required: true }),
      testClass: t.arg.string({ required: true }),
      board: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      questionIds: t.arg.stringList({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.dailyTest.create({
        data: {
          ...args,
        },
      }),
  })
)

builder.queryField("allDailyTest", (t) =>
  t.prismaField({
    type: ["DailyTest"],
    args: {
      date: t.arg({
        type: "Date",
      }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.dailyTest.findMany({
        where: {
          createdAt: args.date ?? undefined,
        },
      }),
  })
)

// builder.queryField("User", (t) =>
//   t.prismaField({
//     type: ["Test"],
//     args: {
//       uid: t.arg.string()
//     },
//     resolve: (query, root, args, ctx) => {

//     }
//   })
// )
