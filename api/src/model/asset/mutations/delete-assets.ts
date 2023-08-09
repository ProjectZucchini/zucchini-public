import { MutationResolvers } from "../../../generated/graphql.js";

export const deleteAssetsMutation: MutationResolvers = {
  deleteAssets: async (_parent, args, context) => {
    await context.prisma.asset.deleteMany({
      where: {
        id: {
          in: args.assetIds.map((assetId) => parseInt(assetId)),
        },
      },
    });

    return {
      code: "200",
      success: true,
    };
  },
};
