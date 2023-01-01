import { ObjectId } from "mongodb"

enum DifficultyLevel {
  EASY,
  MEDIUM,
  HARD,
}
export interface QuestionFromSheet {
  SrNo: number
  Question: string
  options: string
  correctoption: number
  testname: string
  difficultylevel: string
  Subject: string
  Language: string
}
export type C = {
  id: string
  name: string
  logo: string | null
  class: string
  subject: string
  board: string
  testIds: string[]
}
export type T = {
  id: string
  name: string
  instructions: string[]
  rating: number | null
  testClass: string
  board: string
  subject: string
  totalMarks: number
  paid: boolean
  passingMarks: number
  chapterId: string
  dailyTest: boolean | null
  date: Date | null
  questionIds: string[]
}
export type Q = {
  id: string
  chapter: string[]
  options: string[]
  details: string
  correctOption: number
  explanation: string | null
  image: string | null
  tags: string[]
  subject: string
  questionClass: string
  createdBy: string
  difficultyLevel: string
  testIds: string[]
}
/*
  chapter         String[]
  options         String[]
  details         String
  correctOption   Int
  explanation     String?
  image           String?
  tags            String[]
  subject         String
  questionClass   String
  createdBy       String          @default("")
  difficultyLevel DifficultyLevel
*/
