import { ProjetoModel } from '../../types/projeto.model.ts';
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { GridViewOutlined } from '@mui/icons-material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ProjetoProps {
    projeto: ProjetoModel;
    onClick?: (() => void | undefined);
}

const ProjetoLink = ({ projeto, onClick }: ProjetoProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const pathAtual = useResolvedPath(`/projetos/${projeto.id}`);
    const match = useMatch({ path: pathAtual.pathname, end: true });

    function handleClick(): void {
        navigate(`/projetos/${projeto.id}`);
        onClick?.();
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <GridViewOutlined/>
            </ListItemIcon>
            <ListItemText primary={projeto.titulo}/>
            <Box display="flex" alignItems="center" justifyContent="center"
                sx={{
                    minWidth: theme.spacing(6), height: theme.spacing(6),
                    borderRadius: theme.spacing(1),
                    bgcolor: 'black',
                }}>
                <Typography sx={{ color: '#FFF', fontSize: 12 }}>
                    {projeto.tarefas.length}
                </Typography>
            </Box>
        </ListItemButton>
    );
};

export default ProjetoLink;
