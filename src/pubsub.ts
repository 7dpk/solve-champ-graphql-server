import { createPubSub } from "graphql-yoga"
// eslint-disable-next-line import/no-relative-packages
import { User, Doubt } from "@prisma/client"

export enum MutationType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
}

export interface PubSubEvent {
  mutationType: MutationType
}

export interface PubSubUserEvent extends PubSubEvent {
  user: User
}

export interface PubSubDoubtEvent extends PubSubEvent {
  doubt: Doubt
}

export interface PuSubEvents
  extends Record<string, [PubSubEvent] | [string | number, PubSubEvent]> {
  user: [string | number, PubSubUserEvent]
  doubt: [string | number, PubSubDoubtEvent]
  users: [PubSubUserEvent]
  doubts: [PubSubDoubtEvent]
}
export const pubsub = createPubSub<PuSubEvents>({})
