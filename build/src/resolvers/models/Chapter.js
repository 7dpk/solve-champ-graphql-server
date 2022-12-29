"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("Chapter", {
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
});
builder_1.default.mutationField("createChapter", (t) => t.prismaField({
    type: "Chapter",
    args: {
        name: t.arg.string({ required: true }),
        logo: t.arg.string(),
        class: t.arg.string({ required: true }),
        subject: t.arg.string({ required: true }),
        board: t.arg.string({ required: true }),
        testIds: t.arg.stringList({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.chapter.create({
        data: Object.assign({}, args),
    }),
}));
