import { Center, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Toolbar } from "../components/Toolbar";

interface DatabaseProps {
  data: {
    isChild: boolean;
  };
}

const areEqual = (prevProps: DatabaseProps, nextProps: DatabaseProps) =>
  prevProps.data.isChild === nextProps.data.isChild;

export const Database = memo(function Database({ data }: DatabaseProps) {
  return (
    <Paper withBorder radius="sm" p={2}>
      <Toolbar showDetach={data.isChild} />
      <Text size="xs">Database</Text>
      <Center mb={5}>
        <ThemeIcon color="blue" variant="filled" size="lg">
          <IconDatabase size="2rem" />
        </ThemeIcon>
      </Center>
      <Handle type="target" position={Position.Top} />
    </Paper>
  );
}, areEqual);
