import { MutationResolvers } from "../../../generated/graphql.js";

export const updateAssetPositionMutation: MutationResolvers = {
  updateAssetPosition: async (_parent, args, context) => {
    const asset = await context.prisma.asset.update({
      where: {
        id: parseInt(args.data.id),
      },
      data: {
        assetDiagram: {
          update: {
            xPoint: args.data.x,
            yPoint: args.data.y,
          },
        },
      },
    });

    return {
      code: "200",
      success: true,
      asset,
    };
  },
};
