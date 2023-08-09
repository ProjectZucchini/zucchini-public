import { Box, Center, Text } from "@mantine/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { memo } from "react";
import { Toolbar } from "../components/Toolbar";

import "@reactflow/node-resizer/dist/style.css";

interface AvailabilityZoneProps {
  data: {
    isChild: boolean;
  };
  selected: boolean;
}

const areEqual = (prevProps: AvailabilityZoneProps, nextProps: AvailabilityZoneProps) =>
  prevProps.data.isChild === nextProps.data.isChild && prevProps.selected === nextProps.selected;

export const AvailabilityZone = memo(function AvailabilityZone({
  data,
  selected,
}: AvailabilityZoneProps) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.fn.rgba(theme.colors.green[9], 0.1),
        border: "0.0625rem solid #dee2e6",
        borderRadius: "0.25rem",
        height: "100%",
        minHeight: "150px",
        minWidth: "150px",
      })}
    >
      <Toolbar showDetach={data.isChild} />
      <NodeResizer isVisible={selected} minWidth={150} minHeight={150} />
      <Center>
        <Text size="xs">Availability Zone</Text>
      </Center>
    </Box>
  );
},
areEqual);
