import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import type PrismaTypes from "@pothos/plugin-prisma/generated"
// import WithInputPlugin from "@pothos/plugin-with-input"
import ValidationPlugin from "@pothos/plugin-validation"
// import ErrorsPlugin from "@pothos/plugin-errors"
import MocksPlugin from "@pothos/plugin-mocks"
import prisma from "../db"
import { pubsub } from "../pubsub"
import { DateResolver } from "graphql-scalars"
import { ZodError, ZodFormattedError } from "zod"

const builder = new SchemaBuilder<{
  Context: { pubsub: typeof pubsub }
  PrismaTypes: PrismaTypes
  Scalars: {
    Date: { Input: Date; Output: Date }
  }
  WithInputArgRequired: false
}>({
  plugins: [PrismaPlugin, ValidationPlugin, MocksPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
  validationOptions: {
    // optionally customize how errors are formatted
    validationError: (zodError, args, context, info) => {
      // the default behavior is to just throw the zod error directly
      return zodError
    },
  },
})
builder.addScalarType("Date", DateResolver, {})

export const DLevel = builder.enumType("DifficultyLevel", {
  values: ["EASY", "MEDIUM", "HARD"] as const,
})

// error interface
const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
})

builder.objectType(Error, {
  name: "BaseError",
  interfaces: [ErrorInterface],
})

// Util for flattening zod errors into something easier to represent in your Schema.
function flattenErrors(
  error: ZodFormattedError<unknown>,
  path: string[]
): { path: string[]; message: string }[] {
  // eslint-disable-next-line no-underscore-dangle
  const errors = error._errors.map((message) => ({
    path,
    message,
  }))

  Object.keys(error).forEach((key) => {
    if (key !== "_errors") {
      errors.push(
        ...flattenErrors(
          (error as Record<string, unknown>)[key] as ZodFormattedError<unknown>,
          [...path, key]
        )
      )
    }
  })

  return errors
}

// A type for the individual validation issues
const ZodFieldError = builder
  .objectRef<{
    message: string
    path: string[]
  }>("ZodFieldError")
  .implement({
    fields: (t) => ({
      message: t.exposeString("message"),
      path: t.exposeStringList("path"),
    }),
  })

// The actual error type
builder.objectType(ZodError, {
  name: "ZodError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    fieldErrors: t.field({
      type: [ZodFieldError],
      resolve: (err) => flattenErrors(err.format(), []),
    }),
  }),
})

export default builder
