import { NavLink as MantineNavLink, ThemeIcon } from "@mantine/core";

import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

export function NavLink({ icon, color, label, path }: NavLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(path);
  }, [path, navigate]);

  return (
    <MantineNavLink
      icon={
        <ThemeIcon color={color} variant="light" size="lg">
          {icon}
        </ThemeIcon>
      }
      label={label}
      variant="light"
      active={location.pathname === path}
      onClick={handleClick}
    />
  );
}
