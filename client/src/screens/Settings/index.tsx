import { Paper, Text, Title, Stack } from "@mantine/core";
import { useGetOrganizationQuery } from "../../generated/graphql";
import { AwsConfigure } from "../../components/AwsConfigure";

export function Settings() {
  const { loading, data } = useGetOrganizationQuery();

  if (loading || !data) {
    return <></>;
  }

  return (
    <Stack>
      <Paper radius="md" p="md">
        <Title order={1}>Settings</Title>
        <Text>This is where you do stuff with Settings.</Text>
      </Paper>
      <Paper radius="md" p="md">
        <AwsConfigure organization={data.organization} />
      </Paper>
    </Stack>
  );
}
