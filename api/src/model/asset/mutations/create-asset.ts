import { MutationResolvers } from "../../../generated/graphql.js";
import { AssetType } from "../lib/asset-type.js";

const InitialNodeSizes = {
  [AssetType.APPLICATION]: { h: 62, w: 65 },
  [AssetType.AVAILABILITY_ZONE]: { h: 150, w: 150 },
  [AssetType.DATABASE]: { h: 62, w: 57 },
};

export const createAssetMutation: MutationResolvers = {
  createAsset: async (_parent, args, context) => {
    // TODO: Inspect user's session
    const organization = await context.prisma.organization.findFirstOrThrow();

    const asset = await context.prisma.asset.create({
      data: {
        type: AssetType[args.data.type],
        organization: {
          connect: { id: organization.id },
        },
        assetDiagram: {
          create: {
            xPoint: args.data.position.x,
            yPoint: args.data.position.y,
            height: InitialNodeSizes[AssetType[args.data.type]].h,
            width: InitialNodeSizes[AssetType[args.data.type]].w,
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
