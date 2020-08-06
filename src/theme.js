import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const darkTheme = createMuiTheme({
  palette: {
    text: {
        primary: "#ffffff",
        secondary: "#b5b5b5"
    },
    h1Style: {
        primary: "#ffffff",
        secondary: "#b5b5b5"
    },
    primary:{
      main: '#3e3e3e',
    },
    secondary: {
      main: '#0e0e0e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#212121',
    },
  },
});