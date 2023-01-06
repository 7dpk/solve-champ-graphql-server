import builder from "../builder"
import prisma from "../../db"
builder.prismaObject("Micellaneous", {
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
})

builder.queryField("micellaneous", (t) =>
  t.prismaField({
    type: "Micellaneous",
    resolve: async () => {
      const mic = await prisma.micellaneous.findMany({})
      return mic[0]
    },
  })
)
