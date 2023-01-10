import prisma from "../../db"
import builder from "../builder"
import { GraphQLError } from "graphql"
builder.prismaObject("Test", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    instructions: t.exposeStringList("instructions"),
    ratingCount: t.relationCount("allRatings"),
    rating: t.exposeFloat("rating", { nullable: true }),
    testClass: t.exposeString("testClass"),
    board: t.exposeString("board"),
    subject: t.exposeString("subject"),
    totalMarks: t.exposeInt("totalMarks"),
    paid: t.exposeBoolean("paid"),
    passingMarks: t.exposeInt("passingMarks"),
    dailyTest: t.exposeBoolean("dailyTest", { nullable: true }),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
    chapter: t.relation("chapter"),
    questions: t.relation("questions"),
    questionCount: t.int({
      resolve: (test) => test.questionIds.length,
    }),
    // attempted: t.boolean({
    //   resolve: async (test) => {
    //     const testHistory: TestHistory[] = await prisma.testHistory.findMany({
    //       where: {
    //         userId: uid,
    //       },
    //     })
    //     console.log(testHistory)
    //     return true
    //   },
    // }),
    testHistory: t.relation("testHistory"),
    testHistoryCount: t.relationCount("testHistory"),
    allRatings: t.relation("allRatings"),
  }),
})

builder.mutationField("createTest", (t) =>
  t.prismaField({
    type: "Test",
    args: {
      name: t.arg.string({ required: true }),
      instructions: t.arg.stringList({ required: true }),
      rating: t.arg.float({
        validate: {
          type: "number",
          min: 1.0,
          max: 5.0,
        },
      }),
      testClass: t.arg.string({ required: true }),
      board: t.arg.string({ required: true }),
      subject: t.arg.string({ required: true }),
      totalMarks: t.arg.int({ required: true }),
      paid: t.arg.boolean({ required: true }),
      passingMarks: t.arg.int({ required: true }),
      chapterId: t.arg.string({ required: true }),
      questionIds: t.arg.stringList({ required: true }),
      dailyTest: t.arg.boolean(),
      date: t.arg({
        type: "Date",
      }),
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
      const test = await prisma.test.create({
        data: {
          ...args,
        },
      })
      if (!test) {
        throw new GraphQLError("Can't create test", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return test
    },
  })
)

// builder.mutationField("insertQuestion", (t) =>
//   t.prismaField({
//     type: "Test",
//     args: {
//       name: t.arg.string({ required: true }),
//       questionId: t.arg.string({ required: true }),
//     },
//     resolve: (query, _, args, ctx) =>
//       prisma.test.update({
//         where: {
//           name: args.name,
//         },
//         data: {
//           questionIds: {
//             push: args.questionId,
//           },
//         },
//       }),
//   })
// )

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
