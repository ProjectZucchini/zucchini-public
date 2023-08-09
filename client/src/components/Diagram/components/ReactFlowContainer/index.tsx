import { Paper } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  addEdge,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type NodeDimensionChange,
  type ReactFlowInstance,
} from "reactflow";
import { AssetType } from "../../../../generated/graphql";
import { useAttachAssetParent } from "../../../../lib/hooks/attach-asset-parent";
import { useCreateAsset } from "../../../../lib/hooks/create-asset";
import { useCreateConnection } from "../../../../lib/hooks/create-connection";
import { useUpdateAssetPosition } from "../../../../lib/hooks/update-asset-position";
import { useUpdateAssetSize } from "../../../../lib/hooks/update-asset-size";
import { nodeTypes } from "../nodes";
import { Controls } from "../Controls";

import "reactflow/dist/style.css";

interface ReactFlowContainerProps {
  existingNodes: Node[];
  existingEdges: Edge[];
}

export function ReactFlowContainer({ existingNodes, existingEdges }: ReactFlowContainerProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(existingNodes);
  const [edges, setEdges] = useState<Edge[]>(existingEdges);
  const { getIntersectingNodes, getNode, getNodes } = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const attachAssetParent = useAttachAssetParent();
  const createAsset = useCreateAsset();
  const createConnection = useCreateConnection();
  const updateAssetPosition = useUpdateAssetPosition();
  const updateAssetSize = useUpdateAssetSize();

  const [dimensionChange, setDimensionChange] = useDebouncedState<NodeDimensionChange | null>(
    null,
    500
  );

  // Update nodes on initial load or when they change from the server
  useEffect(() => {
    // Sort the nodes so containers are always first in the list.
    // https://reactflow.dev/docs/guides/sub-flows/
    setNodes(existingNodes.sort((a, b) => b.data.isContainer - a.data.isContainer));
  }, [existingNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      for (const change of changes) {
        if (change.type === "dimensions" && !Object.hasOwn(change, "resizing")) {
          setDimensionChange(change);
        }
      }
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Use this to limit how often we save while an asset is being re-sized. Change events are generated pretty
  // rapidly as the box is dragged around
  useEffect(() => {
    if (dimensionChange) {
      const node = getNode(dimensionChange.id);
      node && updateAssetSize(node);
    }
  }, [dimensionChange]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const attachToParent = useCallback(
    (node: Node): boolean => {
      const intersections = getIntersectingNodes(
        node,
        false,
        getNodes().filter((node) => node.data.isContainer)
      ).map((n) => n.id);

      if (!intersections.length) {
        return false;
      }

      // Attach it to the first node. Maybe in future we can ask which one they want?
      const intersectingNode = getNode(intersections[0]);
      if (!intersectingNode?.data.isContainer || node.parentNode || node.data.isContainer) {
        return false;
      }

      attachAssetParent(
        node,
        {
          x: node.position.x - intersectingNode.position.x,
          y: node.position.y - intersectingNode.position.y,
        },
        parseInt(intersectingNode.id)
      );

      return true;
    },
    [attachAssetParent, getIntersectingNodes, getNode, getNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        createConnection(parseInt(connection.source), parseInt(connection.target));
      }

      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges, createConnection]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof data === "undefined" || !data) {
        return;
      }

      const {
        nodeType,
      }: {
        nodeType: AssetType;
      } = JSON.parse(data);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      createAsset(nodeType, position);
    },
    [reactFlowInstance, createAsset]
  );

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const didAttachToParent = attachToParent(node);

      // If the node was attached to the parent, the x/y coordinates where updated then
      // No need to do it here
      if (!didAttachToParent) {
        updateAssetPosition(node);
      }
    },
    [nodes, attachToParent, updateAssetPosition]
  );

  return (
    <Paper withBorder p="md" style={{ maxWidth: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={onNodeDragStop}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        snapToGrid
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Paper>
  );
}
