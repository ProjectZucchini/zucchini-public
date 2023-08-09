import { IconAlertCircle } from "@tabler/icons-react";
import { NavLink } from "../NavLink";

const data = [
  {
    icon: <IconAlertCircle size="1.5rem" />,
    color: "teal",
    label: "Environments",
    path: "/environments",
  },
];

export function NavLinks() {
  const links = data.map((link) => <NavLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
