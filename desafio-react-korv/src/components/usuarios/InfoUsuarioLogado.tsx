import { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { UsuarioModel } from '../../types/usuario.model.ts';
import AvatarComFoto from '../avatar/AvatarComFoto.tsx';
import AvatarComIniciais from '../avatar/AvatarComIniciais.tsx';

interface InfoUsuarioLogadoProps {
    usuario: UsuarioModel
}

const InfoUsuarioLogado = ({ usuario }: InfoUsuarioLogadoProps) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const tamanho = parseInt(theme.spacing(12));

    return (
        <Box width={theme.spacing(70)} height={theme.spacing(20)} paddingX={theme.spacing(2)}
            display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
                {usuario.urlFoto
                    ? <AvatarComFoto altura={tamanho} largura={tamanho} urlFoto={usuario.urlFoto}/>
                    : <AvatarComIniciais altura={tamanho} largura={tamanho} nome={usuario.nome}/>}
                <Typography variant="body1">{usuario.nome}</Typography>
            </Box>

            <IconButton aria-label="expand menu" color="primary" onClick={() => setExpanded((prev) => !prev)}>
                {expanded ? <ExpandLess/> : <ExpandMore/>}
            </IconButton>
        </Box>
    );
};

export default InfoUsuarioLogado;
