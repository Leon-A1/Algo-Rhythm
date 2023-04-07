import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const getPalette = (mode) => ({
  primary: {
    main: "#601010",
    light: "#8B1616",
    lighter: "#A52121",
    dark: "#2D0505",
  },
  secondary: {
    main: "#601010",
    light: "#8B1616",
    lighter: "#A52121",
    dark: "#2D0505",
    dark2: "#000",
    darker: "#000",
  },
  text: {
    primary: "#ffffff",
    secondary: grey[600],
  },
  divider: grey[500],
  background: {
    default: "#fff",
    paper: "#000",
  },
  custom: {
    nodeColor: "#FFFFFF",
  },
});

export default function getTheme(mode) {
  const isLightMode = mode === "light";

  return createTheme({
    palette: getPalette(mode),
    shadows: [
      "none",
      `0px 0px 10px -3px  ${mode === "light" ? grey[500] : "transparent"}`,
    ],
    typography: {
      fontFamily: "Sora",
      fontWeightLight: 200,
      fontWeightMedium: 300,
      fontWeightRegular: 400,
      fontWeightBold: 500,
    },
    custom: {
      main: {
        background: "#000",
      },
      node: {
        color: "#fff",
        mazeWallColor: "#000",
      },
      topBar: {
        background: isLightMode ? "#000" : "#000",
        textColor: !isLightMode ? grey[600] : "#fff",
      },
    },
  });
}
