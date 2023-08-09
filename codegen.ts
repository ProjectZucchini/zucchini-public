import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./api/src/**/*.gql",
  documents: "./client/src/**/*.gql",
  generates: {
    "./api/src/generated/graphql.ts": {
      config: {
        mappers: {
          Asset: "@prisma/client#Asset",
          AssetConnection: "@prisma/client#AssetConnection",
          AssetType: "../model/asset/lib/asset-type#AssetType",
          Organization: "@prisma/client#Organization",
        },
        mapperTypeSuffix: "Model",
        enumValues: {},
        useIndexSignature: true,
        contextType: "../middleware/graphql#GraphQLContext",
        maybeValue: "T | undefined | null",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./api/src/generated/typed-defs.ts": {
      plugins: ["bin/codegen-typedefs.cjs"],
    },
    "./client/src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
