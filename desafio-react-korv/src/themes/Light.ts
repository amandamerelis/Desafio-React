import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const LightTheme = createTheme({
    spacing: 4,
    palette: {
        secondary: {
            main: green.A200,
            dark: '#00a655',
            light: green.A100,
            contrastText: green.A700,
        },
        background: {
            paper: '#FFF',
            default: '#F2F4F7',
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
            },
        },
        MuiButton: {
            styleOverrides:{
                root: {
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        }
    },
});
