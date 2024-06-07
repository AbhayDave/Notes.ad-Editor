import { createTheme } from "@mui/material";

export const theme = createTheme({
  props: {
    // Name of the component ⚛️

    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    fontFamily: ['"Poppins"', "sans-serif"].join(","),
  },
  customTheme: {
    bg: "#588157",
    ui: "#eee",
    ui2: "#fff",
    ui3: "#f5f5f5",
    syntax: "#12130f",
    syntax2: "#f4f3ee",
    blurBg: "rgba(255,255,255,0.1)",
    lightHover: "rgba(0, 0, 0, 0.1)",
    hover_primary: "rgba(18, 19, 15, 0.8)",
    // accent: "#588157",
    // primary: "#12130f",
    // secondary: "#f4f3ee",
    // secondary2: "#eee",
    // secondary3: "rgba(0, 0, 0, 0.1)",
  },
});
