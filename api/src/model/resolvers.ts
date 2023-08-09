import { MutationResolvers, QueryResolvers, Resolvers } from "../generated/graphql.js";
import { resolverAssetConnection } from "./connection/resolver.js";
import { resolverAsset } from "./asset/resolver.js";
// import { assetQueries } from './asset/queries.js';
import { assetMutations } from "./asset/mutations/index.js";
import { connectionMutations } from "./connection/mutations/index.js";
import { resolverOrganization } from "./organization/resolvers.js";
import { organizationQueries } from "./organization/queries.js";
import { organizationMutations } from "./organization/mutations/index.js";

const queryResolvers: QueryResolvers = {
  ...organizationQueries,
};

const mutationResolvers: MutationResolvers = {
  ...assetMutations,
  ...connectionMutations,
  ...organizationMutations,
};

export const resolvers: Resolvers = {
  Asset: resolverAsset,
  AssetConnection: resolverAssetConnection,
  Organization: resolverOrganization,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
