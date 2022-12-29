import builder from "../builder"
import { DLevel } from "../builder"
import prisma from "../../db"
builder.prismaObject("Question", {
  fields: (t) => ({
    id: t.exposeID("id"),
    chapter: t.exposeStringList("chapter"),
    options: t.exposeStringList("options"),
    details: t.exposeString("details"),
    correctOption: t.exposeInt("correctOption"),
    explanation: t.exposeString("explanation", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    tags: t.exposeStringList("tags"),
    subject: t.exposeString("subject"),
    class: t.exposeString("questionClass"),
    createdBy: t.exposeString("createdBy"),
    difficulty: t.expose("difficultyLevel", {
      type: DLevel,
    }),
    tests: t.relation("tests"),
  }),
})

builder.mutationField("createQuestion", (t) =>
  // createQuestion
  t.prismaField({
    type: "Question",
    nullable: false,
    args: {
      chapter: t.arg.stringList({ required: true }),
      options: t.arg.stringList({ required: true }),
      details: t.arg.string({ required: true }),
      correctOption: t.arg.int({ required: true }),
      explanation: t.arg.string(),
      image: t.arg.string(),
      tags: t.arg.stringList({ required: true }),
      subject: t.arg.string({ required: true }),
      questionClass: t.arg.string({ required: true }),
      createdBy: t.arg.string({ required: true }),
      difficultyLevel: t.arg({ type: DLevel, required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.question.create({
        data: {
          ...args,
          testIds: [],
        },
      }),
  })
)
