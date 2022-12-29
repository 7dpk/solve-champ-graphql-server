import builder from "./builder"
import prisma from "../db"
const DEFAULT_PAGE_SIZE = 10

builder.queryType({
  fields: (t) => ({
    // User
    user: t.prismaField({
      type: "User",
      nullable: true,
      args: {
        uid: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.user.findUniqueOrThrow({
          where: { uid: args.uid },
          ...query,
        }),
    }),
    allUsers: t.prismaField({
      type: ["User"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.user.findMany({
          ...query,
        }),
    }),
    // test history
    testHistory: t.prismaField({
      type: "TestHistory",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.testHistory.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allTestHistory: t.prismaField({
      type: ["TestHistory"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.testHistory.findMany({
          ...query,
        }),
    }),
    // test history
    enrollHistory: t.prismaField({
      type: "EnrollHistory",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.enrollHistory.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allEnrollHistory: t.prismaField({
      type: ["EnrollHistory"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.enrollHistory.findMany({
          ...query,
        }),
    }),
    // test history
    question: t.prismaField({
      type: "Question",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.question.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allQuestions: t.prismaField({
      type: ["Question"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.question.findMany({
          ...query,
        }),
    }),

    // test history
    test: t.prismaField({
      type: "Test",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.test.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allTests: t.prismaField({
      type: ["Test"],
      nullable: true,
      resolve: (query, root, args, ctx) =>
        prisma.test.findMany({
          ...query,
        }),
    }),

    // test history
    chapter: t.prismaField({
      type: "Chapter",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.chapter.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allChapters: t.prismaField({
      type: ["Chapter"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.chapter.findMany({
          ...query,
        }),
    }),
    getChaptersBy: t.prismaField({
      type: ["Chapter"],
      nullable: true,
      args: {
        class: t.arg.string({ required: true }),
        board: t.arg.string({ required: true }),
        subject: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.chapter.findMany({
          where: {
            ...args,
          },
          ...query,
        }),
    }),
    // test history
    rating: t.prismaField({
      type: "Rating",
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.rating.findUniqueOrThrow({
          where: { id: args.id },
          ...query,
        }),
    }),
    allRatings: t.prismaField({
      type: ["Rating"],
      nullable: true,

      resolve: (query, root, args, ctx) =>
        prisma.rating.findMany({
          ...query,
        }),
    }),
  }),
})
