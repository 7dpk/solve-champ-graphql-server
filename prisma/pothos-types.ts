/* eslint-disable */
import type { Prisma, EnrollHistory, User, TestHistory, Question, Test, Chapter, Rating } from "@prisma/client";
export default interface PrismaTypes {
    EnrollHistory: {
        Name: "EnrollHistory";
        Shape: EnrollHistory;
        Include: Prisma.EnrollHistoryInclude;
        Select: Prisma.EnrollHistorySelect;
        OrderBy: Prisma.EnrollHistoryOrderByWithRelationInput;
        WhereUnique: Prisma.EnrollHistoryWhereUniqueInput;
        Where: Prisma.EnrollHistoryWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "enrollHistory" | "testHistory" | "allRatings";
        ListRelations: "enrollHistory" | "testHistory" | "allRatings";
        Relations: {
            enrollHistory: {
                Shape: EnrollHistory[];
                Types: PrismaTypes["EnrollHistory"];
            };
            testHistory: {
                Shape: TestHistory[];
                Types: PrismaTypes["TestHistory"];
            };
            allRatings: {
                Shape: Rating[];
                Types: PrismaTypes["Rating"];
            };
        };
    };
    TestHistory: {
        Name: "TestHistory";
        Shape: TestHistory;
        Include: Prisma.TestHistoryInclude;
        Select: Prisma.TestHistorySelect;
        OrderBy: Prisma.TestHistoryOrderByWithRelationInput;
        WhereUnique: Prisma.TestHistoryWhereUniqueInput;
        Where: Prisma.TestHistoryWhereInput;
        RelationName: "test" | "user";
        ListRelations: never;
        Relations: {
            test: {
                Shape: Test;
                Types: PrismaTypes["Test"];
            };
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Question: {
        Name: "Question";
        Shape: Question;
        Include: Prisma.QuestionInclude;
        Select: Prisma.QuestionSelect;
        OrderBy: Prisma.QuestionOrderByWithRelationInput;
        WhereUnique: Prisma.QuestionWhereUniqueInput;
        Where: Prisma.QuestionWhereInput;
        RelationName: "tests";
        ListRelations: "tests";
        Relations: {
            tests: {
                Shape: Test[];
                Types: PrismaTypes["Test"];
            };
        };
    };
    Test: {
        Name: "Test";
        Shape: Test;
        Include: Prisma.TestInclude;
        Select: Prisma.TestSelect;
        OrderBy: Prisma.TestOrderByWithRelationInput;
        WhereUnique: Prisma.TestWhereUniqueInput;
        Where: Prisma.TestWhereInput;
        RelationName: "chapter" | "questions" | "testHistory" | "allRatings";
        ListRelations: "questions" | "testHistory" | "allRatings";
        Relations: {
            chapter: {
                Shape: Chapter;
                Types: PrismaTypes["Chapter"];
            };
            questions: {
                Shape: Question[];
                Types: PrismaTypes["Question"];
            };
            testHistory: {
                Shape: TestHistory[];
                Types: PrismaTypes["TestHistory"];
            };
            allRatings: {
                Shape: Rating[];
                Types: PrismaTypes["Rating"];
            };
        };
    };
    Chapter: {
        Name: "Chapter";
        Shape: Chapter;
        Include: Prisma.ChapterInclude;
        Select: Prisma.ChapterSelect;
        OrderBy: Prisma.ChapterOrderByWithRelationInput;
        WhereUnique: Prisma.ChapterWhereUniqueInput;
        Where: Prisma.ChapterWhereInput;
        RelationName: "tests";
        ListRelations: "tests";
        Relations: {
            tests: {
                Shape: Test[];
                Types: PrismaTypes["Test"];
            };
        };
    };
    Rating: {
        Name: "Rating";
        Shape: Rating;
        Include: Prisma.RatingInclude;
        Select: Prisma.RatingSelect;
        OrderBy: Prisma.RatingOrderByWithRelationInput;
        WhereUnique: Prisma.RatingWhereUniqueInput;
        Where: Prisma.RatingWhereInput;
        RelationName: "test" | "user";
        ListRelations: never;
        Relations: {
            test: {
                Shape: Test;
                Types: PrismaTypes["Test"];
            };
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
}