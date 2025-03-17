import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProvider theme={createTheme()}>{children}</MuiThemeProvider>;
};
