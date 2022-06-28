//? Configuracion del tema global de la pagina
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
    type: "light",
    primary: {
      main: "#54436b",
      dark: "#44a479",
    },
    secondary: {
      main: "#50CB93",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Martel Sans", "Khula", sans-serif',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#689f38",
        color: "#fff",
      },
    },
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #ACFFAD 30%, #71EFA3 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "black",
        height: 48,
        padding: "0 30px",
      },
    },
    },
})

export default theme