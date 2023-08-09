import { useCallback } from "react";
import { type Node } from "reactflow";
import { useHookAttachAssetParentMutation } from "../../generated/graphql";

export function useAttachAssetParent() {
  const [hookAttachAssetParentMutation] = useHookAttachAssetParentMutation();

  const attachAssetParent = useCallback(
    (node: Node, updatedPosition: { x: number; y: number }, parentId: number) => {
      hookAttachAssetParentMutation({
        variables: {
          data: {
            id: node.id,
            parentId,
            x: updatedPosition.x,
            y: updatedPosition.y,
          },
        },
        optimisticResponse: {
          attachAssetParent: {
            asset: {
              id: node.id,
              __typename: "Asset",
              parent: {
                id: parentId.toString(),
                __typename: "Asset",
              },
              position: {
                ...updatedPosition,
                __typename: "AssetPosition",
              },
              data: {
                ...node.data,
                id: parentId.toString(),
                isChild: true,
              },
            },
          },
        },
      });
    },
    [hookAttachAssetParentMutation]
  );

  return attachAssetParent;
}
