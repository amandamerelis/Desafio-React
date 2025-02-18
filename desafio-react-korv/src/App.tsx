import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { LightTheme } from './themes';
import { PrivateRoutes, PublicRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import MenuLateral from './layouts/menu-lateral/MenuLateral.tsx';
import { MenuLateralProvider } from './contexts';
import { useAuthContext } from './contexts/AuthContext.tsx';
import { isPresent } from './utils/funcoesUteis.ts';
import { ProjetoProvider } from './contexts/ProjetoContext.tsx';

function App() {

    const { usuarioAtual } = useAuthContext();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline/>
            <Box sx={{ display: 'flex', alignItens: 'center', justifyContent: 'center', height: '100vh' }}>

                <MenuLateralProvider>
                    <BrowserRouter>

                        {isPresent(usuarioAtual) ?
                            (<ProjetoProvider usuarioId={usuarioAtual!.id}>
                                <MenuLateral>
                                    <PrivateRoutes/>
                                </MenuLateral> </ProjetoProvider>)
                            : (<PublicRoutes/>)}

                    </BrowserRouter>
                </MenuLateralProvider>

            </Box>
        </ThemeProvider>
    );
}

export default App;
