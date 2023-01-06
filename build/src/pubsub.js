"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = exports.MutationType = void 0;
const graphql_yoga_1 = require("graphql-yoga");
var MutationType;
(function (MutationType) {
    MutationType["CREATED"] = "CREATED";
    MutationType["UPDATED"] = "UPDATED";
    MutationType["DELETED"] = "DELETED";
})(MutationType = exports.MutationType || (exports.MutationType = {}));
exports.pubsub = (0, graphql_yoga_1.createPubSub)({});
