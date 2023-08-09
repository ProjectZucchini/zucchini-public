import { Asset } from "@prisma/client";
import { MutationResolvers } from "../../../generated/graphql.js";
import { AssetType } from "../lib/asset-type.js";

export const saveAssetsMutation: MutationResolvers = {
  saveAssets: async (_parent, args, context) => {
    const updatedAssets: Asset[] = [];
    for (const asset of args.data.assets) {
      updatedAssets.push(
        await context.prisma.asset.update({
          where: {
            id: parseInt(asset.id),
          },
          data: {
            type: AssetType[asset.type],
            assetDiagram: {
              update: {
                xPoint: asset.position.x,
                yPoint: asset.position.y,
              },
            },
          },
        })
      );
    }

    return {
      code: "200",
      success: true,
      assets: updatedAssets,
    };
  },
};
