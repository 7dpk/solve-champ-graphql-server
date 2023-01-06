"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cstring = process.env.DATABASE_URL;
const dbname = "studyChamptest";
const data = (0, fs_1.readFileSync)("./question.json");
let Sheet1 = JSON.parse(data.toString())["Sheet1"];
let testnames = new Set();
Sheet1.forEach((q) => testnames.add(q["testname"]));
let tests = Array.from(testnames);
console.log(tests);
const m = new mongodb_1.MongoClient(cstring);
const chapter = {
    name: "सामाजिक विज्ञान प्रश्नोत्तरी",
    class: "10",
    subject: "सामाजिक विज्ञान",
    board: "बिहार बोर्ड",
    testIds: [],
};
let test = {
    name: "kuch",
    instructions: [
        "चोरी ना करे।",
        "कोई भी बचकानी हरकत बरदास्त नहीं होगी।",
        "टेस्ट देने में परेशानी.. हमसे बात करें।",
    ],
    rating: 3.0,
    testClass: "10",
    board: "Bihar Board",
    subject: "SSCIENCE",
    totalMarks: 100,
    passingMarks: 40,
    dailyTest: false,
    date: new Date(),
    questionIds: [],
};
var question = {};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield m.connect();
    const db = m.db(dbname);
    const chapterColl = db.collection("Chapter");
    // 1 INSERT CHAPTER
    let interResult = yield chapterColl.insertOne(chapter);
    let chapterId = interResult.insertedId.toHexString();
    console.log("Inserted Chapter => id:" + chapterId);
    // 2 INSERT TEST
    let testColl = db.collection("Test");
    for (let i = 0; i < tests.length; ++i) {
        let interResult = yield testColl.insertOne(Object.assign(Object.assign({}, test), { name: tests[i], chapterId: new mongodb_1.ObjectId(chapterId) }));
        let tid = interResult.insertedId.toHexString();
        yield chapterColl.updateOne({ name: chapter.name }, { $push: { testIds: new mongodb_1.ObjectId(tid) } });
        console.log("Inserted Test => " + (i + 1));
    }
    // 3 INSERT QUESTIONS
    let questionColl = db.collection("Question");
    for (let i = 0; i < Sheet1.length; ++i) {
        question.chapter = ["सामाजिक विज्ञान"];
        question.options = Sheet1[i].options.split("@").map((i) => i.trim());
        question.details = Sheet1[i].Question;
        question.correctOption = Sheet1[i].correctoption - 1;
        question.explanation = "";
        question.image = "";
        question.tags = [];
        question.subject = chapter.subject;
        question.questionClass = chapter.class;
        question.createdBy = "8XAqyhLXApaJz6kHznuBapMJtYP20";
        question.difficultyLevel = Sheet1[i].difficultylevel;
        question.testIds = [];
        let interResult = yield questionColl.insertOne(Object.assign({}, question));
        let qid = interResult.insertedId.toHexString();
        yield testColl.updateOne({ name: Sheet1[i].testname }, { $push: { questionIds: new mongodb_1.ObjectId(qid) } });
        console.log("Inserted Question => " + (i + 1));
    }
    m.close();
});
main();
// type arr = Array<number>
// const last = <T>(arr: T[]): T => {
//   return arr[arr.length - 1]
// }
// const l = last([1, 2, 3])
// const t = last<string>(["1", "2"])
// const makeArr = <T, Y>(x: T, y: Y) => {
//   return [x, y]
// }
// const v = makeArr(5, 6)
// const v2 = makeArr(5, "5")
// const makeFullName = <T extends { firstName: string; lastName: string }>(
//   obj: T
// ) => {
//   return {
//     ...obj,
//     fullName: obj.firstName + " " + obj.lastName,
//   }
// }
// const v1 = makeFullName({ firstName: "ryan", lastName: "bob", age: 34 })
// console.log(v1)
// interface Tab<T> {
//   id: number
//   position: string
//   data: T
// }
// type F = Tab<string>
// type E = Tab<number>
// const t1: F = { id: 1, position: "first", data: "some data" }
// console.log(t1)
