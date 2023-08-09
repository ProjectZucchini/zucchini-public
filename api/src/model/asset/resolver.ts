import { AssetResolvers } from "../../generated/graphql.js";
import { assetContainers, valueToEnum } from "./lib/asset-type.js";

export const resolverAsset: AssetResolvers = {
  id: (parent) => parent.id.toString(),

  connections: async (parent, args, context) => {
    return await context.prisma.assetConnection.findMany({
      where: {
        sourceId: parent.id,
      },
    });
  },

  data: (parent) => {
    return {
      id: parent.id.toString(),
      isChild: !!parent.parentAssetId,
      isContainer: assetContainers.has(parent.type),
    };
  },

  parent: (parent, _args, context) => {
    if (parent.parentAssetId) {
      return context.prisma.asset.findFirst({
        where: {
          id: parent.parentAssetId,
        },
      });
    }
  },

  position: async (parent, _args, context) => {
    const assetDiagram = await context.prisma.assetDiagram.findUniqueOrThrow({
      where: {
        id: parent.assetDiagramId,
      },
    });
    return {
      id: parent.id.toString(),
      x: assetDiagram.xPoint,
      y: assetDiagram.yPoint,
    };
  },

  style: async (parent, _args, context) => {
    const assetDiagram = await context.prisma.assetDiagram.findUniqueOrThrow({
      where: {
        id: parent.assetDiagramId,
      },
    });
    return {
      id: parent.id.toString(),
      height: assetDiagram.height,
      width: assetDiagram.width,
    };
  },

  type: (parent) => valueToEnum(parent.type),
};
