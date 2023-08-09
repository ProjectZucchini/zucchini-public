import { QueryResolvers } from "../../generated/graphql.js";

export const organizationQueries: QueryResolvers = {
  // TODO: Inspect user's session
  getOrganization: (parent, args, context) => context.prisma.organization.findFirstOrThrow(),
};
