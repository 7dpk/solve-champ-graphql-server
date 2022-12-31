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
export interface Test {
  name: string
  rating: number
  testClass: string
  board: string
  subject: string
  totalMarks: number
  paid: boolean
  passingMarks: number
  chapterId: string
  questionIds: string[]
}
export interface Question {
  chapter: string[]
  options: string[]
  details: string
  correctOption: number
  explanation?: string
  image?: string
  tags: string[]
  subject: string
  questionClass: string
  createBy: string
  difficultyLevel: string
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
