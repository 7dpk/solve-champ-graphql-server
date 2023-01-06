"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
const pubsub_1 = require("../../pubsub");
builder_1.default.prismaObject("Doubt", {
    fields: (t) => ({
        id: t.exposeID("id"),
        doubtText: t.exposeString("doubtText"),
        doubtPic: t.exposeString("doubtPic", { nullable: true }),
        solution: t.exposeString("solution", { nullable: true }),
        solutionPic: t.exposeString("solutionPic", { nullable: true }),
        user: t.relation("user"),
        date: t.expose("date", {
            type: "Date",
            nullable: true,
        }),
    }),
});
builder_1.default.queryField("allDoubts", (t) => t.prismaField({
    type: ["Doubt"],
    resolve: (query, root, args, ctx) => db_1.default.doubt.findMany(Object.assign({}, query)),
}));
builder_1.default.queryField("doubt", (t) => t.prismaField({
    type: "Doubt",
    args: {
        id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.doubt.findUniqueOrThrow({
        where: {
            id: args.id,
        },
    }),
}));
builder_1.default.mutationField("createDoubt", (t) => t.prismaField({
    type: "Doubt",
    args: {
        doubtText: t.arg.string({ required: true }),
        uid: t.arg.string({ required: true }),
        doubtPic: t.arg.string(),
    },
    resolve: (query, root, args, ctx) => db_1.default.doubt.create({
        data: Object.assign({}, args),
    }),
}));
builder_1.default.mutationField("updateDoubt", (t) => t.prismaField({
    type: "Doubt",
    args: {
        id: t.arg.string({ required: true }),
        doubtText: t.arg.string(),
        doubtPic: t.arg.string(),
        solution: t.arg.string(),
        solutionPic: t.arg.string(),
        uid: t.arg.string(),
    },
    resolve: (query, root, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const doubt = yield db_1.default.doubt.update({
            where: { id: args.id },
            data: {
                doubtText: (_a = args.doubtText) !== null && _a !== void 0 ? _a : undefined,
                doubtPic: (_b = args.doubtPic) !== null && _b !== void 0 ? _b : undefined,
                solution: (_c = args.solution) !== null && _c !== void 0 ? _c : undefined,
                solutionPic: (_d = args.solutionPic) !== null && _d !== void 0 ? _d : undefined,
                uid: (_e = args.uid) !== null && _e !== void 0 ? _e : undefined,
            },
        });
        ctx.pubsub.publish("doubt", doubt.id, {
            mutationType: pubsub_1.MutationType.UPDATED,
            doubt,
        });
        return doubt;
    }),
}));
