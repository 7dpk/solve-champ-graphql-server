"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("EnrollHistory", {
    fields: (t) => ({
        id: t.exposeID("id"),
        createdAt: t.expose("date", {
            type: "Date",
            nullable: true,
        }),
        courseName: t.exposeString("courseName"),
        price: t.exposeString("price"),
        user: t.relation("user"),
    }),
});
builder_1.default.mutationField("createEnrollHistory", (t) => t.prismaField({
    type: "EnrollHistory",
    nullable: false,
    args: {
        date: t.arg.string({ required: true }),
        courseName: t.arg.string({ required: true }),
        price: t.arg.string({ required: true }),
        userId: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.enrollHistory.create({
        data: Object.assign({}, args),
    }),
}));
