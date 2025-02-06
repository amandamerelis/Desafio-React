import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { LightTheme } from './themes';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import MenuLateral from './layouts/menu-lateral/MenuLateral.tsx';
import { MenuLateralProvider } from './contexts';

function App() {

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Box display="flex">
                <MenuLateralProvider>
                    <BrowserRouter>
                        <MenuLateral>
                            <AppRoutes/>
                        </MenuLateral>
                    </BrowserRouter>
                </MenuLateralProvider>
            </Box>
        </ThemeProvider>
    );
}

export default App;
