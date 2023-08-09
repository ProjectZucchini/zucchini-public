import { MutationResolvers } from "../../../generated/graphql";

export const organizationMutations: MutationResolvers = {
  updateOrganization: async (parent, args, context) => {
    // TODO: Inspect user's session
    const organization = await context.prisma.organization.findFirstOrThrow();

    const updatedOrg = await context.prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: {
        awsTrustPolicyAttached: args.data.awsTrustPolicyAttached,
      },
    });

    return {
      code: "200",
      success: true,
      organization: updatedOrg,
    };
  },
};
