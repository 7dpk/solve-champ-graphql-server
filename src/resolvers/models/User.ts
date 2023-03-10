import builder from "../builder"
import prisma from "../../db"
import { GraphQLError } from "graphql"
builder.prismaObject("User", {
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
    studentStream: t.exposeString("studentStream", { nullable: true }),
    pro: t.exposeBoolean("pro", { nullable: true }),
    language: t.exposeString("language"),
    district: t.exposeString("district", { nullable: true }),
    target: t.exposeStringList("target"),
    rollCode: t.exposeString("rollCode", { nullable: true }),
    rollNo: t.exposeString("rollNo", { nullable: true }),
    isScholarship: t.exposeBoolean("isScholarship", { nullable: true }),
    query: t.relation("Inquiry"),
    queryCount: t.relationCount("Inquiry"),
    fcm_token: t.exposeString("fcm_token", { nullable: true }),
    doubt: t.relation("doubts"),
    doubtCount: t.relationCount("doubts"),
    resolvedDoubts: t.relationCount("doubts", {
      where: {
        resolved: true,
      },
    }),
    enrollHistory: t.relation("enrollHistory"),
    testHistory: t.relation("testHistory"),
    testHistoryCount: t.relationCount("testHistory"),
    allRatings: t.relation("allRatings"),
    ratingCount: t.relationCount("allRatings"),
    notification: t.relation("CustomNotification"),
    notificationCount: t.relationCount("CustomNotification"),
    batches: t.relation("batches"),
    batchesCount: t.relationCount("batches"),
  }),
})

builder.mutationField("createUser", (t) =>
  t.prismaField({
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
      studentStream: t.arg.string(),
      language: t.arg.string({ required: true }),
      district: t.arg.string(),
      fcm_token: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (ctx.uid !== args.uid) {
        throw new GraphQLError("Imposter Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const user = await prisma.user.create({
        data: {
          ...args,
          target: [],
        },
      })
      if (!user) {
        throw new GraphQLError("Can't create user", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }

      return user
    },
  })
)

builder.mutationField("updateUser", (t) =>
  t.prismaField({
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
      studentStream: t.arg.string(),
      language: t.arg.string(),
      district: t.arg.string(),
      rollCode: t.arg.string(),
      rollNo: t.arg.string(),
      isScholarship: t.arg.boolean(),
      target: t.arg.stringList(),
      fcm_token: t.arg.string(),
    },

    resolve: (query, root, args, ctx) => {
      if (ctx.uid !== args.uid) {
        throw new GraphQLError("Imposter Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const user = prisma.user.update({
        where: { uid: args.uid },
        data: {
          name: args.name ?? undefined,
          email: args.email ?? undefined,
          mobile: args.mobile ?? undefined,
          dob: args.dob ?? undefined,
          gender: args.gender ?? undefined,
          pic_url: args.pic_url ?? undefined,
          pincode: args.pincode ?? undefined,
          schoolName: args.schoolName ?? undefined,
          board: args.board ?? undefined,
          studentClass: args.studentClass ?? undefined,
          studentStream: args.studentStream ?? undefined,
          language: args.language ?? undefined,
          district: args.district ?? undefined,
          target: args.target ?? [],
          rollCode: args.rollCode ?? undefined,
          rollNo: args.rollNo ?? undefined,
          isScholarship: args.isScholarship ?? undefined,
          fcm_token: args.fcm_token ?? undefined,
        },
      })
      if (!user) {
        throw new GraphQLError("Can't update user", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      return user
    },
  })
)

// USER query
builder.prismaObject("Inquiry", {
  fields: (t) => ({
    id: t.exposeString("id"),
    text: t.exposeString("text"),
    user: t.relation("user"),
  }),
})
builder.mutationField("createQuery", (t) =>
  t.prismaField({
    type: "Inquiry",
    args: {
      text: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      if (ctx.uid !== args.uid) {
        throw new GraphQLError("Not Authorized", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const qn = (
        await prisma.user
          .findUniqueOrThrow({
            where: {
              uid: args.uid,
            },
          })
          .Inquiry()
      )?.length
      if (qn > 4) {
        throw new GraphQLError("Can't create any more queries", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      const q = await prisma.inquiry.create({
        data: {
          ...args,
        },
      })
      if (!q) {
        throw new GraphQLError("Can't create query", {
          extensions: {
            http: {
              status: 400,
            },
          },
        })
      }
      return q
    },
  })
)
