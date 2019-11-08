import { createMuiTheme } from "@material-ui/core/styles";

import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: red,
    background: {
      default: "#2196f3"
    }
  },
  overrides: {
    MuiButton: {
      outlined: {
        border: "1px solid rgba(0, 0, 0, .75)"
      }
    }
  }
});

export default theme;
