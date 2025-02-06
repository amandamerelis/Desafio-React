import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Home, Menu } from '@mui/icons-material';
import { useMenuLateralContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

interface LayoutBaseProps {
    children: React.ReactNode;
    titulo: string;
}

const LayoutBase = ({ children, titulo }: LayoutBaseProps) => {

    const theme = useTheme();
    const menorQueSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleMenuLateral, larguraDrawer } = useMenuLateralContext();
    const navigate = useNavigate();

    function handleRedirectHome(): void {
        navigate('/home');
    }

    return (
        <Box width="100%" height="100%"
            display="flex" flexDirection="column" justifyContent="center">
            <AppBar
                position='fixed'
                sx={{
                    height: theme.spacing(15),
                    width: { xs: '100%', sm: `calc(100% - ${larguraDrawer}px)` },
                    ml: { sm: `${larguraDrawer}px` },
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
            >
                <Toolbar>
                    {menorQueSm && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleMenuLateral}
                    >
                        <Menu/>
                    </IconButton>}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="página inicial"
                        sx={{ mr: 2 }}
                        onClick={handleRedirectHome}
                    >
                        <Home/>
                    </IconButton>
                    <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
                        {titulo}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ marginTop: 20, height: '100%', overflow: 'auto' }}>
                {children}
            </Box>
        </Box>
    );
};

export default LayoutBase;
