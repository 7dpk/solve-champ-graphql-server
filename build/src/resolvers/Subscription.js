"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("./builder"));
const db_1 = __importDefault(require("../db"));
const pubsub_1 = require("../pubsub");
builder_1.default.enumType(pubsub_1.MutationType, {
    name: "MutationType",
});
const SubscriptionEvent = builder_1.default
    .interfaceRef("SubscriptionEvent")
    .implement({
    fields: (t) => ({
        mutationType: t.exposeString("mutationType"),
    }),
});
const SubscriptionDoubtEvent = builder_1.default.objectRef("SubscriptionDoubtEvent");
SubscriptionDoubtEvent.implement({
    interfaces: [SubscriptionEvent],
    fields: (t) => ({
        doubt: t.prismaField({
            type: "Doubt",
            nullable: true,
            resolve: (query, event) => db_1.default.doubt.findUnique(Object.assign(Object.assign({}, query), { where: { id: event.doubt.id } })),
        }),
    }),
});
const SubscriptionUserEvent = builder_1.default.objectRef("SubscriptionUserEvent");
SubscriptionUserEvent.implement({
    interfaces: [SubscriptionEvent],
    fields: (t) => ({
        user: t.prismaField({
            type: "User",
            nullable: true,
            resolve: (query, event) => db_1.default.user.findUnique(Object.assign(Object.assign({}, query), { where: { id: event.user.id } })),
        }),
    }),
});
builder_1.default.subscriptionType({
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
});
