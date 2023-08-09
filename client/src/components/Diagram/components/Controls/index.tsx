import { ActionIcon, Button, Divider, Group, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBorderCorners,
  IconEraser,
  IconLock,
  IconLockOpen,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import { useCallback } from "react";
import {
  Controls as RFControls,
  useReactFlow,
  useStore,
  useStoreApi,
  type ReactFlowState,
} from "reactflow";
import {
  GetAssetsDocument,
  useControlsDeleteAssetsMutation,
  type GetAssetsQuery,
} from "../../../../generated/graphql";

const isInteractiveSelector = (s: ReactFlowState) =>
  s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;

export function Controls() {
  const store = useStoreApi();
  const isInteractive = useStore(isInteractiveSelector);
  const { fitView, getNodes, zoomIn, zoomOut } = useReactFlow();

  const [clearOpened, { open: openClear, close: closeClear }] = useDisclosure(false);

  const [controlsDeleteAssetsMutation] = useControlsDeleteAssetsMutation();

  const onZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const onZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const onFitView = useCallback(() => {
    fitView();
  }, [fitView]);

  const onToggleInteractive = useCallback(() => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  }, [store, isInteractive]);

  const onClear = useCallback(() => {
    if (!getNodes().length) {
      return;
    }

    openClear();
  }, [getNodes, openClear]);

  const onExecuteClear = useCallback(() => {
    const nodeIds = getNodes().map((node) => node.id);
    controlsDeleteAssetsMutation({
      variables: {
        assetIds: nodeIds,
      },
      update(cache) {
        const cachedQuery = cache.readQuery<GetAssetsQuery>({
          query: GetAssetsDocument,
        });

        if (!cachedQuery?.organization) {
          return;
        }

        cache.writeQuery({
          query: GetAssetsDocument,
          data: {
            organization: {
              ...cachedQuery.organization,
              assets: [],
            },
          },
        });
      },
    });

    closeClear();
  }, [controlsDeleteAssetsMutation, getNodes, closeClear]);

  return (
    <>
      <Modal opened={clearOpened} onClose={closeClear} title="Clear All Assets" centered>
        <Stack>
          <Text size="sm">Are you sure you want to clear all assets from the diagram?</Text>
          <Group position="right">
            <Button onClick={onExecuteClear} color="red">
              Confirm
            </Button>
            <Button onClick={closeClear} color="gray">
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <RFControls position="top-left" showZoom={false} showFitView={false} showInteractive={false}>
        <Group spacing="xs">
          <Tooltip label="Toggle interactivity">
            <ActionIcon variant="outlined" onClick={onToggleInteractive}>
              {isInteractive ? <IconLockOpen size="1.5rem" /> : <IconLock size="1.5rem" />}
            </ActionIcon>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip label="Zoom in">
            <ActionIcon variant="outlined" onClick={onZoomIn}>
              <IconZoomIn size="1.5rem" />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Zoom out">
            <ActionIcon variant="outlined" onClick={onZoomOut}>
              <IconZoomOut size="1.5rem" />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Fit view">
            <ActionIcon variant="outlined" onClick={onFitView}>
              <IconBorderCorners size="1.5rem" />
            </ActionIcon>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip label="Clear">
            <ActionIcon variant="outlined" onClick={onClear}>
              <IconEraser size="1.5rem" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </RFControls>
    </>
  );
}
