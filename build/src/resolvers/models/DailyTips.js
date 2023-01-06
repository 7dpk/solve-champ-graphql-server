"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("DailyTips", {
    fields: (t) => ({
        id: t.exposeID("id"),
        videoId: t.exposeString("videoId"),
        header: t.exposeString("header"),
        date: t.expose("date", {
            type: "Date",
            nullable: true,
        }),
        bgcolor: t.exposeString("bgcolor", { nullable: true }),
        imgUrl: t.exposeString("imgUrl"),
    }),
});
builder_1.default.queryField("dailyTips", (t) => t.prismaField({
    type: "DailyTips",
    nullable: true,
    args: {
        date: t.arg({
            type: "Date",
            required: true,
        }),
    },
    resolve: (query, _, args, ctx) => db_1.default.dailyTips.findFirst({
        where: {
            date: {
                lte: args.date,
            },
        },
    }),
}));
builder_1.default.queryField("allDailyTips", (t) => t.prismaField({
    type: ["DailyTips"],
    nullable: true,
    resolve: (query, _, args, ctx) => db_1.default.dailyTips.findMany(),
}));
builder_1.default.mutationField("createDailyTips", (t) => t.prismaField({
    type: "DailyTips",
    args: {
        videoId: t.arg.string({ required: true }),
        header: t.arg.string({ required: true }),
        bgcolor: t.arg.string(),
        imgUrl: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.dailyTips.create({
        data: Object.assign({}, args),
    }),
}));
