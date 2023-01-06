"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
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
        rollCode: t.exposeString("rollCode", { nullable: true }),
        rollNo: t.exposeString("rollNo", { nullable: true }),
        isScholarship: t.exposeBoolean("isScholarship", { nullable: true }),
        doubt: t.relation("doubts"),
        doubtCount: t.relationCount("doubts"),
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
            // validate: {
            //   schema: z.string().regex(/^(\+ \d+){14}$/),
            // },
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
    },
    resolve: (query, root, args, ctx) => db_1.default.user.create({
        data: Object.assign(Object.assign({}, args), { target: [] }),
    }),
}));
builder_1.default.mutationField("updateUser", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        uid: t.arg.string({ required: true }),
        name: t.arg.string(),
        email: t.arg.string(),
        mobile: t.arg.string(),
        dob: t.arg({
            type: "Date",
        }),
        gender: t.arg.string(),
        pic_url: t.arg.string(),
        pincode: t.arg.int(),
        schoolName: t.arg.string(),
        board: t.arg.string(),
        studentClass: t.arg.string(),
        language: t.arg.string(),
        district: t.arg.string(),
        rollCode: t.arg.string(),
        rollNo: t.arg.string(),
        isScholarship: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const user = db_1.default.user.update({
            where: { uid: args.uid },
            data: {
                name: (_a = args.name) !== null && _a !== void 0 ? _a : undefined,
                email: (_b = args.email) !== null && _b !== void 0 ? _b : undefined,
                mobile: (_c = args.mobile) !== null && _c !== void 0 ? _c : undefined,
                dob: (_d = args.dob) !== null && _d !== void 0 ? _d : undefined,
                gender: (_e = args.gender) !== null && _e !== void 0 ? _e : undefined,
                pic_url: (_f = args.pic_url) !== null && _f !== void 0 ? _f : undefined,
                pincode: (_g = args.pincode) !== null && _g !== void 0 ? _g : undefined,
                schoolName: (_h = args.schoolName) !== null && _h !== void 0 ? _h : undefined,
                board: (_j = args.board) !== null && _j !== void 0 ? _j : undefined,
                studentClass: (_k = args.studentClass) !== null && _k !== void 0 ? _k : undefined,
                language: (_l = args.language) !== null && _l !== void 0 ? _l : undefined,
                district: (_m = args.district) !== null && _m !== void 0 ? _m : undefined,
                target: [],
                rollCode: (_o = args.rollCode) !== null && _o !== void 0 ? _o : undefined,
                rollNo: (_p = args.rollNo) !== null && _p !== void 0 ? _p : undefined,
                isScholarship: (_q = args.isScholarship) !== null && _q !== void 0 ? _q : undefined,
            },
        });
        return user;
    },
}));
