import { AssetConnectionResolvers } from "../../generated/graphql";

export const resolverAssetConnection: AssetConnectionResolvers = {
  id: (parent) => parent.id.toString(),
  target: (parent, args, context) =>
    context.prisma.asset.findUniqueOrThrow({
      where: {
        id: parent.targetId,
      },
    }),
};
