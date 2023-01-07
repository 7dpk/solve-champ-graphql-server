import builder from "../builder"
import prisma from "../../db"
builder.prismaObject("Notification", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})

builder.prismaObject("CustomNotification", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    date: t.expose("date", {
      type: "Date",
      nullable: true,
    }),
  }),
})

builder.queryField("allGlobalNotifications", (t) =>
  t.prismaField({
    type: ["Notification"],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
    },
    resolve: (query, parent, arg, ctx) =>
      prisma.notification.findMany({
        ...query,
        take: arg.take ?? 10,
        skip: arg.skip ?? 0,
      }),
  })
)

builder.queryField("notificationBy", (t) =>
  t.prismaField({
    type: ["CustomNotification"],
    args: {
      uid: t.arg.string({ required: true }),
      take: t.arg.int(),
      skip: t.arg.int(),
    },
    resolve: (query, parent, arg, ctx) =>
      prisma.customNotification.findMany({
        where: {
          uid: arg.uid,
        },
        ...query,
        take: arg.take ?? 10,
        skip: arg.skip ?? 0,
      }),
  })
)

builder.mutationField("createGlobalNotification", (t) =>
  t.prismaField({
    type: "Notification",
    args: {
      title: t.arg.string({ required: true }),
      body: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.notification.create({
        data: {
          ...args,
        },
      }),
  })
)
builder.mutationField("createCustomNotification", (t) =>
  t.prismaField({
    type: "CustomNotification",
    args: {
      title: t.arg.string({ required: true }),
      body: t.arg.string({ required: true }),
      uid: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx) =>
      prisma.customNotification.create({
        data: {
          ...args,
        },
      }),
  })
)
