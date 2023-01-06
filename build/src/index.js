"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const http_1 = require("http");
const resolvers_1 = __importDefault(require("./resolvers"));
const pubsub_1 = require("./pubsub");
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: resolvers_1.default.toSchema(),
    context: () => ({ pubsub: pubsub_1.pubsub }),
});
const server = (0, http_1.createServer)(yoga);
server.listen(4001, () => console.log("Server is running on localhost:4001"));
// self.addEventListener("fetch", yoga)
