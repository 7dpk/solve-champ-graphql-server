import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  // log: ["query"],
})

// prisma.$use((params, next) => {
//   console.log(params);

//   return next(params);
// });

export default prisma
