import { useCallback } from "react";
import { type Node } from "reactflow";
import { useHookUpdateAssetPositionMutation } from "../../generated/graphql";

export function useUpdateAssetPosition() {
  const [hookUpdateAssetPositionMutation] = useHookUpdateAssetPositionMutation();

  const updateAssetPosition = useCallback(
    (asset: Node) => {
      hookUpdateAssetPositionMutation({
        variables: {
          data: {
            id: asset.id,
            x: asset.position.x,
            y: asset.position.y,
          },
        },
        optimisticResponse: {
          updateAssetPosition: {
            asset: {
              id: asset.id,
              __typename: "Asset",
              position: {
                ...asset.position,
                id: asset.id,
                __typename: "AssetPosition",
              },
            },
          },
        },
      });
    },
    [hookUpdateAssetPositionMutation]
  );

  return updateAssetPosition;
}
