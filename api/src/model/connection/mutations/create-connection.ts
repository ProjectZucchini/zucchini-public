import { MutationResolvers } from "../../../generated/graphql.js";

export const createConnectionMutation: MutationResolvers = {
  createConnection: async (_parent, args, context) => {
    const connection = await context.prisma.assetConnection.create({
      data: {
        sourceId: args.data.sourceId,
        targetId: args.data.targetId,
      },
    });

    return {
      code: "200",
      success: true,
      connection,
    };
  },
};
