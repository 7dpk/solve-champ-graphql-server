"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const builder_2 = require("../builder");
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("Question", {
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
            type: builder_2.DLevel,
        }),
        tests: t.relation("tests"),
    }),
});
builder_1.default.mutationField("createQuestion", (t) => 
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
        difficultyLevel: t.arg({ type: builder_2.DLevel, required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.question.create({
        data: Object.assign(Object.assign({}, args), { testIds: [] }),
    }),
}));
