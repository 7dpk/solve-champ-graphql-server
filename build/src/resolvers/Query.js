"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("./builder"));
const db_1 = __importDefault(require("../db"));
const DEFAULT_PAGE_SIZE = 10;
builder_1.default.queryType({
    fields: (t) => ({
        // User
        user: t.prismaField({
            type: "User",
            nullable: true,
            args: {
                uid: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.user.findUniqueOrThrow(Object.assign({ where: { uid: args.uid } }, query)),
        }),
        allUsers: t.prismaField({
            type: ["User"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.user.findMany(Object.assign({}, query)),
        }),
        // test history
        testHistory: t.prismaField({
            type: "TestHistory",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.testHistory.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
        }),
        allTestHistory: t.prismaField({
            type: ["TestHistory"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.testHistory.findMany(Object.assign({}, query)),
        }),
        // test history
        enrollHistory: t.prismaField({
            type: "EnrollHistory",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.enrollHistory.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
        }),
        allEnrollHistory: t.prismaField({
            type: ["EnrollHistory"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.enrollHistory.findMany(Object.assign({}, query)),
        }),
        // test history
        question: t.prismaField({
            type: "Question",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.question.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
        }),
        allQuestions: t.prismaField({
            type: ["Question"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.question.findMany(Object.assign({}, query)),
        }),
        // test history
        test: t.prismaField({
            type: "Test",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.test.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
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
            resolve: (query, root, args, ctx) => db_1.default.test.findFirst({
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
            resolve: (query, root, args, ctx) => db_1.default.test.findMany(Object.assign({}, query)),
        }),
        // test history
        chapter: t.prismaField({
            type: "Chapter",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.chapter.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
        }),
        allChapters: t.prismaField({
            type: ["Chapter"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.chapter.findMany(Object.assign({}, query)),
        }),
        getChaptersBy: t.prismaField({
            type: ["Chapter"],
            nullable: true,
            args: {
                class: t.arg.string({ required: true }),
                board: t.arg.string({ required: true }),
                subject: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.chapter.findMany(Object.assign({ where: Object.assign({}, args) }, query)),
        }),
        // test history
        rating: t.prismaField({
            type: "Rating",
            nullable: true,
            args: {
                id: t.arg.string({ required: true }),
            },
            resolve: (query, root, args, ctx) => db_1.default.rating.findUniqueOrThrow(Object.assign({ where: { id: args.id } }, query)),
        }),
        allRatings: t.prismaField({
            type: ["Rating"],
            nullable: true,
            resolve: (query, root, args, ctx) => db_1.default.rating.findMany(Object.assign({}, query)),
        }),
    }),
});
