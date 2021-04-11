import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const paletteDark = {
  primary: "#0085FE",
  secondary: "rgba(36,42,46)",
  error: "rgba(255,1,86,1)",
  background: "#1b262c",
  text: "#bbe1fa",
  paper: "rgba(246,249,252,1)",
  textSecondary: "#bbe1fa",
};

export const paletteLight = {
  primary: "#0085FE",
  secondary: "rgba(36,42,46)",
  error: "rgba(255,1,86,1)",
  background: "rgba(255,255,255,1)",
  paper: "rgba(246,249,252,1)",
  text: "rgba(49,65,76,1)",
  textSecondary: "#6B7C93",
  redFire: "rgba(255,1,86,1)",
  yellowCanary: "rgba(255,177,13,1)",
};

const options = (dark: boolean): ThemeOptions => {
  const palette = dark ? paletteDark : paletteLight;
  return {
    typography: {
      fontFamily: [
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      error: {
        main: red.A400,
      },
      background: {
        default: palette.background,
        paper: palette.paper,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },

      // ...
    },
    overrides: {
      MuiAppBar: {
        colorDefault: {
          color: palette.text,
          backgroundColor: palette.paper,
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow:
            "0px 2px 4px -1px rgb(5 0 10 / 5%), 0px 4px 5px 0px rgb(5 0 10 / 3.5%), 0px 1px 10px 0px rgb(5 0 10 / 3%)",
        },
        elevation24: {
          boxShadow:
            "0px 11px 15px -7px rgb(0 0 0 / 5%), 0px 24px 38px 3px rgb(0 0 0 / 3.5%), 0px 9px 46px 8px rgb(0 0 0 / 3%)",
        },
      },
    },
  };
};

const theme = (dark: boolean): ThemeOptions => createMuiTheme(options(dark));

// Create a theme instance.
export default theme;
