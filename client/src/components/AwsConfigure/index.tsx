import { Code, Text, Title, Group, Button, Stack } from "@mantine/core";
import { useUpdateOrganization } from "../../lib/hooks/update-organization";
import { useCallback } from "react";
import { AwsConfigureOrganizationFragment } from "../../generated/graphql";

interface AwsConfigureProps {
  organization: AwsConfigureOrganizationFragment;
}

export function AwsConfigure({ organization }: AwsConfigureProps) {
  const updateOrganization = useUpdateOrganization();
  const zucchiniAWSAccountId = "1234567890";

  const attachAwsTrustPolicy = useCallback(() => {
    updateOrganization(organization.id, true);
  }, [organization.id]);
  const detachAwsTrustPolicy = useCallback(() => {
    updateOrganization(organization.id, false);
  }, [organization.id]);

  const code = `
    {
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "${organization.id}"
        }
      },
      "Effect": "Allow",
      "Principal": {
        "AWS": "${zucchiniAWSAccountId}"
      }
    }
  `;

  return (
    <Stack>
      <Title>Configure AWS</Title>
      <Group>
        <Text fw={800}>External ID:</Text>
        <Text>{organization.id}</Text>
      </Group>
      <Text>Please add the following statement to its Trust relationship section:</Text>
      <Code block>{code}</Code>
      {organization.awsTrustPolicyAttached ? (
        <Button onClick={detachAwsTrustPolicy} color="red">
          Remove
        </Button>
      ) : (
        <Button onClick={attachAwsTrustPolicy}>Attach</Button>
      )}
    </Stack>
  );
}
