import ProjetoLink from './ProjetoLink.tsx';
import { Box, List, useTheme } from '@mui/material';
import { useProjetoContext } from '../../contexts/ProjetoContext.tsx';

const ListaProjetos = () => {

    const theme = useTheme();
    const { projetos } = useProjetoContext();

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: theme.spacing(4),
            alignItems: 'center', justifyContent: 'flex-start', overflowY: 'auto'
        }}
        >
            <List component="nav"
                sx={{
                    width: theme.spacing(70),
                    display: 'flex', flexDirection: 'column', gap: 2
                }}>
                {projetos.map((projeto) => (<ProjetoLink key={projeto.id} projeto={projeto}/>))}
            </List>
        </Box>
    );
};

export default ListaProjetos;
