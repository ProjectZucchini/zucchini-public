import { Avatar, Box, Text, NavLink, useMantineTheme, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
      }}
    >
      <NavLink
        icon={<Avatar src="https://placekitten.com/380/380" radius="xl" />}
        label={
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Sir Kitten
            </Text>
            <Text color="dimmed" size="xs">
              sirkitten@gmail.com
            </Text>
          </Box>
        }
        rightSection={<IconChevronRight size={rem(18)} />}
      />
    </Box>
  );
}
