import { Navbar as MantineNavbar } from "@mantine/core";
import { NavLinks } from "./components/NavLinks";
import { Settings } from "./components/Settings";
import { User } from "./components/User";

export function Navbar() {
  return (
    <MantineNavbar p="xs" width={{ base: 250 }}>
      <MantineNavbar.Section grow mt="md">
        <NavLinks />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Settings />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <User />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
