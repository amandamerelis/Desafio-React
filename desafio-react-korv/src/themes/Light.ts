import {createTheme} from '@mui/material';
import {green} from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        secondary: {
            main: green.A200,
            dark: green.A400,
            light: green.A100,
            contrastText: green.A700,
        },
        background:{
            default: '#F2F4F7',
            paper: '#FCFCFD',
        }
    }
});
