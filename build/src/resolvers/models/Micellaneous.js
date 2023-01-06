"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("../builder"));
const db_1 = __importDefault(require("../../db"));
builder_1.default.prismaObject("Micellaneous", {
    fields: (t) => ({
        id: t.exposeID("id"),
        phone: t.exposeString("phone", { nullable: true }),
        whatsAppNumber: t.exposeString("whatsAppNumber", { nullable: true }),
        videoId: t.exposeString("videoId", { nullable: true }),
        mentorName: t.exposeString("mentorName", { nullable: true }),
        mentorPhone: t.exposeString("mentorPhone", { nullable: true }),
        mentorWhatsApp: t.exposeString("mentorWhatsApp", { nullable: true }),
        mentorAbout: t.exposeString("mentorAbout", { nullable: true }),
    }),
});
builder_1.default.queryField("micellaneous", (t) => t.prismaField({
    type: "Micellaneous",
    resolve: () => __awaiter(void 0, void 0, void 0, function* () {
        const mic = yield db_1.default.micellaneous.findMany({});
        return mic[0];
    }),
}));
