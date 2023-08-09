import { IconSettings } from "@tabler/icons-react";

import { NavLink } from "../NavLink";

export function Settings() {
  return (
    <NavLink icon={<IconSettings size="1.5rem" />} color="gray" label="Settings" path="/settings" />
  );
}
