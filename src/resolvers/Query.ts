import builder from "./builder"
import prisma from "../db"
const DEFAULT_PAGE_SIZE = 10

builder.queryType({
  fields: (t) => ({
    // mock
    greetings: t.string({
      resolve: () => "Hello World!",
    }),
    // User
    user: t.prismaField({
      type: "User",
      nullable: true,
      args: {
        uid: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx) =>
        prisma.user.findUniqueOrThrow({
          where: {
            uid: args.uid,
          },
          ...query,
        }),
    }),
    allUsers: t.prismaField({
      type: ["User"],
      nullable: true,
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.user.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.testHistory.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.enrollHistory.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.question.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
    // daily test
    dailyTest: t.prismaField({
      type: "Test",
      nullable: true,
      args: {
        date: t.arg({
          type: "Date",
          required: true,
        }),
      },
      resolve: (query, root, args, ctx) =>
        prisma.test.findFirstOrThrow({
          where: {
            dailyTest: true,
            date: {
              lte: args.date,
            },
          },
        }),
    }),

    allTests: t.prismaField({
      type: ["Test"],
      nullable: true,
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.test.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.chapter.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
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
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args, ctx) =>
        prisma.rating.findMany({
          ...query,
          take: args.take ?? DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
        }),
    }),
  }),
})
