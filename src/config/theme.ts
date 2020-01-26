import { createMuiTheme } from "@material-ui/core/styles";

import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";

// declare module "@material-ui/core/styles/createMuiTheme" {
//   interface Theme {
//     calendar: {
//       allDay: string;
//       am: string;
//       pm: string;
//     };
//   }
//   // allow configuration using `createMuiTheme`
//   interface ThemeOptions {
//     calendar?: {
//       allDay: string;
//       am: string;
//       pm: string;
//     };
//   }
// }

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
  // calendar: {
  //   allDay: "black",
  //   am: lightBlue[400],
  //   pm: red[400]
  // }
});

export default theme;
