import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        fontSize: 12,
        lineHeight: 1,
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 14,
      }
    }
  },
  palette: {
    primary: {
      light: blue[400],
      main: blue[700],
      dark: blue[900],
    },
    secondary: {
      light: "#f7b485",
      main: "#e65100",
      dark: "#e65100",
    },
    error: {
      light: red[200],
      main: red[700],
      dark: "#b84d4d",
    },
    warning: {
      main: red[500],
    },
    info: {
      main: green[500],
    },
    success: {
      light: green[200],
      main: green[500],
      dark: green[700],
    },
  },
});

export default theme;
