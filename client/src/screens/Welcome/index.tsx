import { Center, Paper, Text, Title } from "@mantine/core";

export function Welcome() {
  return (
    <Center>
      <Paper radius="md" p="md">
        <Title order={1}>Welcome To Project Zucchini</Title>
        <Text>This is going to be the coolest app in the world!</Text>
      </Paper>
    </Center>
  );
}
