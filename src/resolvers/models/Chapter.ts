import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"

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
    freeTestCount: t.exposeInt("freeTestCount"),
    attemptedTestCount: t.int({
      resolve: (chapter, args, ctx) =>
        chapter.testIds.filter((i) => ctx.th.includes(i)).length,
    }),
    videos: t.relation("videos"),
    videoCount: t.relationCount("videos"),
  }),
})
// resolve: (chapter, args, ctx) =>
//         chapter.testIds.filter((i) => ctx.th.includes(i)).length,
//     }),
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
      const chapter = await prisma.chapter.create({
        data: {
          ...args,
        },
      })
      if (!chapter) {
        throw new GraphQLError("Can't create chapter", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return chapter
    },
  })
)
