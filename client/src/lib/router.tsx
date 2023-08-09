import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AuthCallback } from "../screens/AuthCallback";
import { Environments } from "../screens/Environments";
import { Welcome } from "../screens/Welcome";
import { Settings } from "../screens/Settings";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "callback",
        element: <AuthCallback />,
      },
      {
        path: "environments",
        element: <Environments />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
