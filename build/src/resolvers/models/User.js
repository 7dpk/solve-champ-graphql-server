"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
const zod_1 = require("zod");
builder_1.default.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeID("id"),
        uid: t.exposeString("uid"),
        name: t.exposeString("name"),
        mobile: t.exposeString("mobile"),
        email: t.exposeString("email", { nullable: true }),
        dob: t.expose("dob", {
            type: "Date",
            nullable: true,
        }),
        gender: t.exposeString("gender", { nullable: true }),
        pic_url: t.exposeString("pic_url", { nullable: true }),
        pincode: t.exposeInt("pincode", { nullable: true }),
        schoolName: t.exposeString("schoolName"),
        board: t.exposeString("board"),
        studentClass: t.exposeString("studentClass"),
        pro: t.exposeBoolean("pro", { nullable: true }),
        language: t.exposeString("language"),
        district: t.exposeString("district", { nullable: true }),
        target: t.exposeStringList("target"),
        enrollHistory: t.relation("enrollHistory"),
        testHistory: t.relation("testHistory"),
        testHistoryCount: t.relationCount("testHistory"),
        allRatings: t.relation("allRatings"),
        ratingCount: t.relationCount("allRatings"),
    }),
});
builder_1.default.mutationField("createUser", (t) => t.prismaField({
    type: "User",
    args: {
        uid: t.arg.string({ required: true }),
        name: t.arg.string({ required: true }),
        email: t.arg.string({
            validate: {
                email: [true, { message: "Invalid email Address" }],
            },
        }),
        mobile: t.arg.string({
            required: true,
            validate: {
                schema: zod_1.z.string().regex(/^(\d+){10}$/),
            },
        }),
        dob: t.arg({
            type: "Date",
        }),
        gender: t.arg.string(),
        pic_url: t.arg.string(),
        pincode: t.arg.int({
            validate: {
                type: "number",
                min: 100000,
                max: 999999,
            },
        }),
        schoolName: t.arg.string({ required: true }),
        board: t.arg.string({ required: true }),
        studentClass: t.arg.string({ required: true }),
        language: t.arg.string({ required: true }),
        district: t.arg.string(),
        target: t.arg.stringList({ required: true }),
    },
    resolve: (query, root, args, ctx) => db_1.default.user.create({
        data: Object.assign({}, args),
    }),
}));
builder_1.default.mutationField("updateUser", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        uid: t.arg.string({ required: true }),
        name: t.arg.string({ required: true }),
        email: t.arg.string(),
        mobile: t.arg.string({ required: true }),
        dob: t.arg({
            type: "Date",
        }),
        gender: t.arg.string(),
        pic_url: t.arg.string(),
        pincode: t.arg.int(),
        schoolName: t.arg.string({ required: true }),
        board: t.arg.string({ required: true }),
        studentClass: t.arg.string({ required: true }),
        language: t.arg.string({ required: true }),
        district: t.arg.string(),
        target: t.arg.stringList({ required: true }),
    },
    resolve: (query, root, args, ctx) => {
        const user = db_1.default.user.update({
            where: { uid: args.uid },
            data: Object.assign({}, args),
        });
        return user;
    },
}));
