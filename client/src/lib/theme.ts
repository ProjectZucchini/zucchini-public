import { MantineThemeOverride } from "@mantine/core";

export const mantineTheme: MantineThemeOverride = {
  globalStyles: (theme) => ({
    body: {
      ...theme.fn.fontStyles(),
      backgroundColor: theme.colors.green[0],
    },
    ".canvas": {
      height: "100%",
    },
  }),
  colors: {
    "dark-green": [
      "#e2fded",
      "#bbf5d1",
      "#92edb3",
      "#68e596",
      "#41de79",
      "#29c45f",
      "#1e994a",
      "#126d34",
      "#06411e",
      "#001805",
    ],
  },
  primaryColor: "green",
  fontFamily: "Arial, Helvetica, sans-serif",
  components: {
    Title: {
      defaultProps: {
        color: "dark-green.8",
      },
    },
  },
};
