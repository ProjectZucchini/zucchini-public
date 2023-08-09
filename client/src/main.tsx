import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
// import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { apolloClient } from "./lib/apolloClient";
import { mantineTheme } from "./lib/theme";
import { router } from "./lib/router";

// Using React.StrictMode breaks auth0 as-is. The double render breaks it's
// state comparison after redirect. Fix later so we can brink back StrictMode
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </MantineProvider>
  // </React.StrictMode>
);
