import createTheme from "styled-components-theme";

export const colors = {
  primary: "#115F64",
  secondary: "#9899a4",
  subprime: "#1A9B72"
};

const theme = createTheme(...Object.keys(colors));
export default theme;
