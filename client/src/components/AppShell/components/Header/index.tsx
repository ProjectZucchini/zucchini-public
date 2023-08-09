import { useCallback } from "react";
import {
  Group,
  Header as MantineHeader,
  Image,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <MantineHeader height={60} p="xs">
      <UnstyledButton onClick={handleClick}>
        <Group
          sx={(theme) => ({
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingBottom: theme.spacing.lg,
          })}
        >
          <ThemeIcon size="xl">
            <Image src="/zucchini.svg" alt="Icon" />
          </ThemeIcon>
          <Title>Project Zucchini</Title>
        </Group>
      </UnstyledButton>
    </MantineHeader>
  );
}
