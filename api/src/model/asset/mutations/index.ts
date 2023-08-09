import { MutationResolvers } from "../../../generated/graphql.js";
import { attachAssetParentMutation } from "./attach-asset-parent.js";
import { createAssetMutation } from "./create-asset.js";
import { deleteAssetsMutation } from "./delete-assets.js";
import { detachAssetParentMutation } from "./detach-asset-parent.js";
import { updateAssetPositionMutation } from "./update-asset-position.js";
import { updateAssetSizeMutation } from "./update-asset-size.js";

export const assetMutations: MutationResolvers = {
  ...attachAssetParentMutation,
  ...createAssetMutation,
  ...deleteAssetsMutation,
  ...detachAssetParentMutation,
  ...updateAssetPositionMutation,
  ...updateAssetSizeMutation,
};
