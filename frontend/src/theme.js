// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
     fontFamily: "Poppins, sans-serif"
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3d58',
    },
    secondary: {
      main: '#057dcd',
    },
    background: {
      default: '#bfdff1',
      white: '#e8eef1'
    },
    text: {
      primary: '#1F384C',
      header: '#0d1b2a',
      lightGrey: '#273240'
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
    info: {
      main: '#0288d1',
    },
    header:{
        indigoLight: '#bbdefb'
    },
    hover:{
        row:'#d0ebff'
    },
    selected:{
        row:'#ede7f6'
    }
  },
});
export default theme;
