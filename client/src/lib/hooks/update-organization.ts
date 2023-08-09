import { useCallback } from "react";
import { useHookUpdateOrganizationMutation } from "../../generated/graphql";

export function useUpdateOrganization() {
  const [hookUpdateOrganizationMutation] = useHookUpdateOrganizationMutation();

  const updateOrganization = useCallback(
    (id: string, awsTrustPolicyAttached: boolean) => {
      hookUpdateOrganizationMutation({
        variables: {
          data: {
            awsTrustPolicyAttached,
          },
        },
        optimisticResponse: {
          updateOrganization: {
            organization: {
              __typename: "Organization",
              id,
              awsTrustPolicyAttached,
            },
          },
        },
      });
    },
    [hookUpdateOrganizationMutation]
  );

  return updateOrganization;
}
