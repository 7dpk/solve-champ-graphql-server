"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLevel = void 0;
const core_1 = __importDefault(require("@pothos/core"));
const plugin_prisma_1 = __importDefault(require("@pothos/plugin-prisma"));
const plugin_with_input_1 = __importDefault(require("@pothos/plugin-with-input"));
const plugin_validation_1 = __importDefault(require("@pothos/plugin-validation"));
const plugin_errors_1 = __importDefault(require("@pothos/plugin-errors"));
const db_1 = __importDefault(require("../db"));
const graphql_scalars_1 = require("graphql-scalars");
const zod_1 = require("zod");
const builder = new core_1.default({
    plugins: [plugin_prisma_1.default, plugin_with_input_1.default, plugin_errors_1.default, plugin_validation_1.default],
    prisma: {
        client: db_1.default,
        // defaults to false, uses /// comments from prisma schema as descriptions
        // for object types, relations and exposed fields.
        // descriptions can be omitted by setting description to false
        exposeDescriptions: false,
        // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
        filterConnectionTotalCount: true,
    },
    withInput: {
        typeOptions: {
        // default options for Input object types created by this plugin
        },
        argOptions: {
            // set required: false to override default behavior
            required: false,
        },
    },
    errorOptions: {
        defaultTypes: [Error],
    },
    validationOptions: {
        // optionally customize how errors are formatted
        validationError: (zodError, args, context, info) => {
            // the default behavior is to just throw the zod error directly
            return zodError;
        },
    },
});
builder.addScalarType("Date", graphql_scalars_1.DateResolver, {});
exports.DLevel = builder.enumType("DifficultyLevel", {
    values: ["EASY", "MEDIUM", "HARD"],
});
// error interface
const ErrorInterface = builder.interfaceRef("Error").implement({
    fields: (t) => ({
        message: t.exposeString("message"),
    }),
});
builder.objectType(Error, {
    name: "BaseError",
    interfaces: [ErrorInterface],
});
// Util for flattening zod errors into something easier to represent in your Schema.
function flattenErrors(error, path) {
    // eslint-disable-next-line no-underscore-dangle
    const errors = error._errors.map((message) => ({
        path,
        message,
    }));
    Object.keys(error).forEach((key) => {
        if (key !== "_errors") {
            errors.push(...flattenErrors(error[key], [...path, key]));
        }
    });
    return errors;
}
// A type for the individual validation issues
const ZodFieldError = builder
    .objectRef("ZodFieldError")
    .implement({
    fields: (t) => ({
        message: t.exposeString("message"),
        path: t.exposeStringList("path"),
    }),
});
// The actual error type
builder.objectType(zod_1.ZodError, {
    name: "ZodError",
    interfaces: [ErrorInterface],
    fields: (t) => ({
        fieldErrors: t.field({
            type: [ZodFieldError],
            resolve: (err) => flattenErrors(err.format(), []),
        }),
    }),
});
exports.default = builder;
