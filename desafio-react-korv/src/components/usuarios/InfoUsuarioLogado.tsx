import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { UsuarioModel } from '../../types/usuario.model.ts';
import AvatarComFoto from '../avatar/AvatarComFoto.tsx';
import AvatarComIniciais from '../avatar/AvatarComIniciais.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

interface InfoUsuarioLogadoProps {
    usuario: UsuarioModel
}

const InfoUsuarioLogado = ({ usuario }: InfoUsuarioLogadoProps) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { logout } = useAuthContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box width={theme.spacing(70)} height={theme.spacing(20)} paddingX={theme.spacing(2)}
            display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
                {usuario.urlFoto
                    ? <AvatarComFoto tamanho="grande" estilo="rounded" urlFoto={usuario.urlFoto} />
                    : <AvatarComIniciais tamanho="grande" estilo="rounded" nome={usuario.nome}/>}
                <Typography variant="body1">{usuario.nome}</Typography>
            </Box>

            <IconButton aria-label="expand menu" color="primary" onClick={handleClick}>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default InfoUsuarioLogado;
