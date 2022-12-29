"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("./builder"));
require("./models/User");
require("./models/Test");
require("./models/Chapter");
require("./models/EnrollHistory");
require("./models/Question");
require("./models/Rating");
require("./models/TestHistory");
require("./Query");
require("./Mutation");
exports.default = builder_1.default;
