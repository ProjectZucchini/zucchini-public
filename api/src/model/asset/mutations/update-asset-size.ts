import { MutationResolvers } from "../../../generated/graphql.js";

export const updateAssetSizeMutation: MutationResolvers = {
  updateAssetSize: async (_parent, args, context) => {
    const asset = await context.prisma.asset.update({
      where: {
        id: parseInt(args.data.id),
      },
      data: {
        assetDiagram: {
          update: {
            height: args.data.height,
            width: args.data.width,
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
