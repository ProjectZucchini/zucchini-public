export enum AssetType {
  APPLICATION = 1,
  AVAILABILITY_ZONE = 2,
  DATABASE = 3,
}

export const assetContainers = new Set([AssetType.AVAILABILITY_ZONE]);

export function valueToEnum(value: number): AssetType {
  if (!AssetType[value]) {
    throw Error();
  }

  return AssetType[value] as unknown as AssetType;
}
