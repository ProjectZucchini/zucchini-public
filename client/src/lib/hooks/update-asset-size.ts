import { useCallback } from "react";
import { type Node } from "reactflow";
import { useHookUpdateAssetSizeMutation } from "../../generated/graphql";

export function useUpdateAssetSize() {
  const [hookUpdateAssetSizeMutation] = useHookUpdateAssetSizeMutation();

  const updateAssetPosition = useCallback((asset: Node) => {
    if (!asset.height || !asset.width) {
      return;
    }
    hookUpdateAssetSizeMutation({
      variables: {
        data: {
          id: asset.id,
          height: asset.height,
          width: asset.width,
        },
      },
      optimisticResponse: {
        updateAssetSize: {
          asset: {
            id: asset.id,
            __typename: "Asset",
            style: {
              id: asset.id,
              height: asset.height,
              width: asset.width,
              __typename: "AssetStyle",
            },
          },
        },
      },
    });
  }, []);

  return updateAssetPosition;
}
