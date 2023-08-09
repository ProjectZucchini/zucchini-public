import { AppShell as MantineAppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";

export function AppShell() {
  return (
    <MantineAppShell padding="md" header={<Header />} navbar={<Navbar />}>
      <Outlet />
    </MantineAppShell>
  );
}
