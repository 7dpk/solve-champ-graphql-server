import { readFileSync } from "fs"
import { MongoClient, ObjectId } from "mongodb"
import { QuestionFromSheet, T, Q, C } from "./interfaces"

const cstring = ""
const dbname = "studyChamptest"
const data = readFileSync("./question.json")
let Sheet1: QuestionFromSheet[] = JSON.parse(data.toString())["Sheet1"]
let testnames = new Set<string>()
Sheet1.forEach((q) => testnames.add(q["testname"]))
let tests = Array.from(testnames)
console.log(tests)

const m = new MongoClient(cstring)

const chapter: Partial<C> = {
  name: "सामाजिक विज्ञान प्रश्नोत्तरी",
  class: "10",
  subject: "सामाजिक विज्ञान",
  board: "बिहार बोर्ड",
  testIds: [],
}

let test: Partial<T> = {
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
}

var question: Partial<Q> = {}
const main = async () => {
  await m.connect()
  const db = m.db(dbname)
  const chapterColl = db.collection("Chapter")
  // 1 INSERT CHAPTER
  let interResult = await chapterColl.insertOne(chapter)
  let chapterId = interResult.insertedId.toHexString()
  console.log("Inserted Chapter => id:" + chapterId)
  // 2 INSERT TEST
  let testColl = db.collection("Test")
  for (let i = 0; i < tests.length; ++i) {
    let interResult = await testColl.insertOne({
      ...test,
      name: tests[i],
      chapterId: new ObjectId(chapterId),
    })
    let tid = interResult.insertedId.toHexString()
    await chapterColl.updateOne(
      { name: chapter.name },
      { $push: { testIds: new ObjectId(tid) } }
    )
    console.log("Inserted Test => " + (i + 1))
  }

  // 3 INSERT QUESTIONS
  let questionColl = db.collection("Question")
  for (let i = 0; i < Sheet1.length; ++i) {
    question.chapter = ["सामाजिक विज्ञान"]
    question.options = Sheet1[i].options.split("@").map((i) => i.trim())
    question.details = Sheet1[i].Question
    question.correctOption = Sheet1[i].correctoption - 1
    question.explanation = ""
    question.image = ""
    question.tags = []
    question.subject = chapter.subject
    question.questionClass = chapter.class
    question.createdBy = "8XAqyhLXApaJz6kHznuBapMJtYP20"
    question.difficultyLevel = Sheet1[i].difficultylevel
    question.testIds = []
    let interResult = await questionColl.insertOne({ ...question })
    let qid = interResult.insertedId.toHexString()
    await testColl.updateOne(
      { name: Sheet1[i].testname },
      { $push: { questionIds: new ObjectId(qid) } }
    )
    console.log("Inserted Question => " + (i + 1))
  }
  m.close()
}
main()
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
