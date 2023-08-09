import { useCallback } from "react";
import {
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  type MantineColor,
} from "@mantine/core";
import { IconDatabase, IconServer, IconSquare, type Icon } from "@tabler/icons-react";
import { AssetType } from "../../../../generated/graphql";

interface Asset {
  id: number;
  name: string;
  nodeType: string;
  isContainer: boolean;
  color: MantineColor;
  icon: Icon;
}

const assets: Asset[] = [
  {
    id: 1,
    name: "Availability Zone",
    nodeType: AssetType.AvailabilityZone,
    isContainer: true,
    color: "gray",
    icon: IconSquare,
  },
  {
    id: 2,
    name: "Application",
    nodeType: AssetType.Application,
    isContainer: false,
    color: "green",
    icon: IconServer,
  },
  {
    id: 3,
    name: "Database",
    nodeType: AssetType.Database,
    isContainer: false,
    color: "blue",
    icon: IconDatabase,
  },
];

export function Sidebar() {
  const onDragStart = useCallback(
    (
      event: React.DragEvent<HTMLButtonElement>,
      data: { nodeType: string; isContainer: boolean }
    ) => {
      event.dataTransfer.setData("application/reactflow", JSON.stringify(data));
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <Paper withBorder p="md" style={{ flexGrow: "0" }}>
      <Stack>
        {assets.map((asset) => {
          const Icon = asset.icon;
          return (
            <UnstyledButton
              key={asset.id}
              onDragStart={(event) =>
                onDragStart(event, {
                  nodeType: asset.nodeType,
                  isContainer: asset.isContainer,
                })
              }
              draggable
            >
              <Group spacing="xs">
                <ThemeIcon color={asset.color} variant="filled" size="lg">
                  <Icon size="2rem" />
                </ThemeIcon>
                <Text size="sm">{asset.name}</Text>
              </Group>
            </UnstyledButton>
          );
        })}
      </Stack>
    </Paper>
  );
}
