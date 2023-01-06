import builder from "./builder"
import prisma from "../db"

import {
  MutationType,
  PubSubEvent,
  PubSubDoubtEvent,
  PubSubUserEvent,
} from "../pubsub"

builder.enumType(MutationType, {
  name: "MutationType",
})

const SubscriptionEvent = builder
  .interfaceRef<PubSubEvent>("SubscriptionEvent")
  .implement({
    fields: (t) => ({
      mutationType: t.exposeString("mutationType"),
    }),
  })

const SubscriptionDoubtEvent = builder.objectRef<PubSubDoubtEvent>(
  "SubscriptionDoubtEvent"
)

SubscriptionDoubtEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    doubt: t.prismaField({
      type: "Doubt",
      nullable: true,
      resolve: (query, event) =>
        prisma.doubt.findUnique({
          ...query,
          where: { id: event.doubt.id },
        }),
    }),
  }),
})

const SubscriptionUserEvent = builder.objectRef<PubSubUserEvent>(
  "SubscriptionUserEvent"
)

SubscriptionUserEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    user: t.prismaField({
      type: "User",
      nullable: true,
      resolve: (query, event) =>
        prisma.user.findUnique({
          ...query,
          where: { id: event.user.id },
        }),
    }),
  }),
})

builder.subscriptionType({
  fields: (t) => ({
    doubt: t.field({
      type: SubscriptionDoubtEvent,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe("doubt", args.id),
      resolve: (event) => event,
    }),
    doubts: t.field({
      type: SubscriptionDoubtEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe("doubts"),
      resolve: (payload) => payload,
    }),
    user: t.field({
      type: SubscriptionUserEvent,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe("user", args.id),
      resolve: (event) => event,
    }),
    users: t.field({
      type: SubscriptionUserEvent,
      subscribe: (root, args, ctx) => ctx.pubsub.subscribe("users"),
      resolve: (payload) => payload,
    }),
  }),
})
