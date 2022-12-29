import builder from "../builder"
import prisma from "../../db"
builder.prismaObject("TestHistory", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userResponses: t.exposeIntList("userResponses"),
    correctResponses: t.exposeIntList("correctResponses"),
    user: t.relation("user"),
    test: t.relation("test"),
    createdAt: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})
builder.mutationField("createTestHistory", (t) =>
  t.prismaField({
    type: "TestHistory",
    nullable: false,
    args: {
      testId: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
      date: t.arg.string(),
      userResponses: t.arg.intList({ required: true }),
      correctResponses: t.arg.intList({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.testHistory.create({
        data: {
          ...args,
        },
      }),
  })
)

builder.queryField("testHistoryBy", (t) =>
  t.prismaField({
    type: ["TestHistory"],
    nullable: true,
    args: {
      userId: t.arg.string(),
      testId: t.arg.string(),
    },
    resolve: (query, root, args, ctx) =>
      prisma.testHistory.findMany({
        where: {
          userId: args.userId ?? undefined,
          testId: args.testId ?? undefined,
        },
      }),
  })
)
