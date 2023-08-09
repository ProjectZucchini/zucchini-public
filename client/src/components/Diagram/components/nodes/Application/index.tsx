import { Center, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconServer } from "@tabler/icons-react";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Toolbar } from "../components/Toolbar";

interface ApplicationProps {
  data: {
    isChild: boolean;
  };
}

const areEqual = (prevProps: ApplicationProps, nextProps: ApplicationProps) =>
  prevProps.data.isChild === nextProps.data.isChild;

export const Application = memo(function Application({ data }: ApplicationProps) {
  return (
    <Paper withBorder radius="sm" p={2}>
      <Toolbar showDetach={data.isChild} />
      <Text size="xs">Application</Text>
      <Center mb={5}>
        <ThemeIcon color="green" variant="filled" size="lg">
          <IconServer size="2rem" />
        </ThemeIcon>
      </Center>
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
}, areEqual);
