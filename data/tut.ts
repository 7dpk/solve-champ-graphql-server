import { read, readFileSync } from "fs"
import { MongoClient } from "mongodb"
import { Test, QuestionFromSheet, Question } from "./interfaces"

const data = readFileSync("question.json")
let Sheet1: QuestionFromSheet[] = JSON.parse(data.toString())["Sheet1"]
let tests = new Set()
Sheet1.forEach((q) => tests.add(q["testname"]))
console.log(tests)

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
