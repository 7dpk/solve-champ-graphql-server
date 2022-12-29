"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("TestHistory", {
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
});
builder_1.default.mutationField("createTestHistory", (t) => t.prismaField({
    type: "TestHistory",
    nullable: false,
    args: {
        testId: t.arg.string({ required: true }),
        userId: t.arg.string({ required: true }),
        date: t.arg.string(),
        userResponses: t.arg.intList({ required: true }),
        correctResponses: t.arg.intList({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.testHistory.create({
        data: Object.assign({}, args),
    }),
}));
builder_1.default.queryField("testHistoryBy", (t) => t.prismaField({
    type: ["TestHistory"],
    nullable: true,
    args: {
        userId: t.arg.string(),
        testId: t.arg.string(),
    },
    resolve: (query, root, args, ctx) => {
        var _a, _b;
        return db_1.default.testHistory.findMany({
            where: {
                userId: (_a = args.userId) !== null && _a !== void 0 ? _a : undefined,
                testId: (_b = args.testId) !== null && _b !== void 0 ? _b : undefined,
            },
        });
    },
}));
