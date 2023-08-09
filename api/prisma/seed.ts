import { PrismaClient } from "@prisma/client";
import { AssetType } from "../src/model/asset/lib/asset-type.js";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.create({
    data: {
      name: "Good Gateway",
    },
  });

  const appAsset = await prisma.asset.create({
    data: {
      type: AssetType.APPLICATION,
      organization: {
        connect: { id: organization.id },
      },
      assetDiagram: {
        create: {
          xPoint: 5,
          yPoint: 5,
          height: 62,
          width: 65,
        },
      },
    },
  });

  const dbAsset = await prisma.asset.create({
    data: {
      type: AssetType.DATABASE,
      organization: {
        connect: { id: organization.id },
      },
      assetDiagram: {
        create: {
          xPoint: 5,
          yPoint: 150,
          height: 62,
          width: 57,
        },
      },
    },
  });

  await prisma.assetConnection.create({
    data: {
      source: { connect: { id: appAsset.id } },
      target: { connect: { id: dbAsset.id } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
