import { MutationResolvers } from "../../../generated/graphql.js";
import { createConnectionMutation } from "./create-connection.js";

export const connectionMutations: MutationResolvers = {
  ...createConnectionMutation,
};
