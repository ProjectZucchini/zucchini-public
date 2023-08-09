import { OrganizationResolvers } from "../../generated/graphql.js";

export const resolverOrganization: OrganizationResolvers = {
  assets: async (parent, args, context) => {
    return context.prisma.asset.findMany({
      where: {
        organizationId: +parent.id,
      },
    });
  },
};
