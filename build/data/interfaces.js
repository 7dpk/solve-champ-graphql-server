"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel[DifficultyLevel["EASY"] = 0] = "EASY";
    DifficultyLevel[DifficultyLevel["MEDIUM"] = 1] = "MEDIUM";
    DifficultyLevel[DifficultyLevel["HARD"] = 2] = "HARD";
})(DifficultyLevel || (DifficultyLevel = {}));
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
