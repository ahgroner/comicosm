import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-sour-gummy)',
    allVariants: {
      fontFamily: 'var(--font-sour-gummy)',
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-sour-gummy)',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'var(--font-sour-gummy)',
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
