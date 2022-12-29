"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("Rating", {
    fields: (t) => ({
        id: t.exposeID("id"),
        test: t.relation("test"),
        user: t.relation("user"),
        date: t.expose("date", {
            type: "Date",
            nullable: true,
        }),
        response: t.exposeFloat("response"),
    }),
});
builder_1.default.mutationField("createRating", (t) => t.prismaField({
    type: "Rating",
    args: {
        testId: t.arg.string({ required: true }),
        userId: t.arg.string({ required: true }),
        response: t.arg.float({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.rating.create({
        data: Object.assign({}, args),
    }),
}));
const UpdateRatingInput = builder_1.default.mutationField("updateRating", (t) => t.prismaField({
    type: "Rating",
    args: {
        id: t.arg.string({ required: true }),
        testId: t.arg.string({ required: true }),
        userId: t.arg.string({ required: true }),
        response: t.arg.float({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.rating.update({
        where: { id: args.id },
        data: Object.assign({}, args),
    }),
}));
