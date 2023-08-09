import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconArrowRampRight2, IconTrashX } from "@tabler/icons-react";
import { useCallback } from "react";
import { NodeToolbar, useNodeId, useReactFlow, useStore, type ReactFlowState } from "reactflow";
import {
  useToolbarDeleteAssetsMutation,
  useToolbarDetachAssetParentMutation,
} from "../../../../../../generated/graphql";

const isInteractiveSelector = (s: ReactFlowState) =>
  s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;

interface ToolbarProps {
  showDetach: boolean;
}

export function Toolbar({ showDetach }: ToolbarProps) {
  const nodeId = useNodeId();
  const isInteractive = useStore(isInteractiveSelector);
  const { getNode } = useReactFlow();

  const [toolbarDeleteAssetsMutation] = useToolbarDeleteAssetsMutation();
  const [toolbarDetachAssetParentMutation] = useToolbarDetachAssetParentMutation();

  const handleDelete = useCallback(() => {
    if (nodeId) {
      toolbarDeleteAssetsMutation({
        variables: {
          assetIds: [nodeId],
        },
        update(cache) {
          cache.evict({
            id: cache.identify({ id: nodeId, __typename: "Asset" }),
          });
          cache.gc();
        },
      });
    }
  }, [nodeId, toolbarDeleteAssetsMutation]);

  const handleDetach = useCallback(() => {
    if (!nodeId) {
      return;
    }

    const node = getNode(nodeId);
    if (!node?.parentNode) {
      return;
    }

    const parentNode = getNode(node.parentNode);
    if (!parentNode) {
      return;
    }

    const updatedPosition = {
      x: node.position.x + parentNode.position.x,
      y: node.position.y + parentNode.position.y,
    };

    toolbarDetachAssetParentMutation({
      variables: {
        data: {
          id: node.id,
          x: updatedPosition.x,
          y: updatedPosition.y,
        },
      },
      optimisticResponse: {
        detachAssetParent: {
          asset: {
            id: node.id,
            __typename: "Asset",
            parent: null,
            position: {
              ...updatedPosition,
              __typename: "AssetPosition",
            },
            data: {
              id: node.id,
              isChild: false,
              __typename: "AssetData",
            },
          },
        },
      },
    });
  }, [nodeId, getNode, toolbarDetachAssetParentMutation]);

  return (
    <NodeToolbar>
      {isInteractive && (
        <Group spacing="xs">
          <Tooltip label="Delete">
            <ActionIcon size="sm" color="red" variant="filled" onClick={handleDelete}>
              <IconTrashX size="1.15rem" />
            </ActionIcon>
          </Tooltip>
          {showDetach && (
            <Tooltip label="Detach">
              <ActionIcon size="sm" color="blue" variant="filled" onClick={handleDetach}>
                <IconArrowRampRight2 size="1.15rem" />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )}
    </NodeToolbar>
  );
}
