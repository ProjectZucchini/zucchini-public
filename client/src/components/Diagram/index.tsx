import { Group } from "@mantine/core";
import { useMemo } from "react";
import { ReactFlowProvider, type Edge, type Node } from "reactflow";
import { DiagramAssetFragment } from "../../generated/graphql";

import { ReactFlowContainer } from "./components/ReactFlowContainer";
import { Sidebar } from "./components/Sidebar";

import "reactflow/dist/style.css";

interface DiagramProps {
  assets: DiagramAssetFragment[];
}

export function Diagram({ assets }: DiagramProps) {
  const existingNodes = useMemo(() => {
    return assets.map<Node>((asset) => ({
      id: asset.id,
      type: asset.type,
      data: asset.data,
      position: asset.position,
      style: asset.style,
      height: asset.style.height,
      width: asset.style.width,
      ...(asset.parent?.id && {
        parentNode: asset.parent?.id,
        extent: "parent",
      }),
    }));
  }, [assets]);

  const existingEdges = useMemo(() => {
    return assets.reduce<Edge[]>((connections, asset) => {
      return connections.concat(
        asset.connections.map((connection) => ({
          id: connection.id,
          target: connection.target.id,
          source: asset.id,
        }))
      );
    }, []);
  }, [assets]);

  return (
    <Group
      grow
      align="stretch"
      style={{
        height: "100%",
        paddingRight: "1em",
        paddingBottom: "1em",
      }}
    >
      <Sidebar />

      <ReactFlowProvider>
        <ReactFlowContainer existingNodes={existingNodes} existingEdges={existingEdges} />
      </ReactFlowProvider>
    </Group>
  );
}
