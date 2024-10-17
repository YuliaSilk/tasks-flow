import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#030637',
    },
    secondary: {
      main: '#3C0753', 
    },
  },
  typography: {
    fontFamily: "Nunito", 
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: '20px', 
         backgroundColor: 'transparent',
         
        },
      },
    },
    MuiTextField:{
        styleOverrides:{
            root:{
                
            }

        }
    },
    MuiOutlinedInput:{
        styleOverrides:{
            root:{
                borderColor:"#720455",
                borderRadius: "20px",

            }
        }
    }
  },
});

export default theme;