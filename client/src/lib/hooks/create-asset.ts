import { useCallback } from "react";
import {
  AssetType,
  GetAssetsDocument,
  useHookCreateAssetMutation,
  type GetAssetsQuery,
} from "../../generated/graphql";

const InitialNodeSizes: Record<AssetType, { h: number; w: number }> = {
  [AssetType.Application]: { h: 62, w: 65 },
  [AssetType.AvailabilityZone]: { h: 150, w: 150 },
  [AssetType.Database]: { h: 62, w: 57 },
};

export function useCreateAsset() {
  const [hookCreateAssetMutation] = useHookCreateAssetMutation();

  const createAsset = useCallback(
    (type: AssetType, position: { x: number; y: number }) => {
      const tempId = Date.now().toString();

      hookCreateAssetMutation({
        variables: {
          data: {
            type,
            position,
          },
        },
        optimisticResponse: {
          createAsset: {
            asset: {
              __typename: "Asset",
              id: tempId,
              type,
              parent: null,
              position: {
                ...position,
                id: tempId,
                __typename: "AssetPosition",
              },
              style: {
                id: tempId,
                height: InitialNodeSizes[type].h,
                width: InitialNodeSizes[type].w,
                __typename: "AssetStyle",
              },
              data: {
                id: tempId,
                isChild: false,
                isContainer: false,
              },
              connections: [],
            },
          },
        },
        update(cache, { data }) {
          const cachedQuery = cache.readQuery<GetAssetsQuery>({
            query: GetAssetsDocument,
          });

          if (!cachedQuery?.organization.assets || !data?.createAsset?.asset) {
            return;
          }

          const updatedAssets = [...cachedQuery.organization.assets, data.createAsset.asset];
          cache.writeQuery({
            query: GetAssetsDocument,
            data: {
              organization: {
                ...cachedQuery.organization,
                assets: updatedAssets,
              },
            },
          });
        },
      });
    },
    [hookCreateAssetMutation]
  );

  return createAsset;
}
