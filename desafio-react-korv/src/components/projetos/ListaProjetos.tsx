import ProjetoLink from './ProjetoLink.tsx';
import { Box, List, useTheme } from '@mui/material';
import { ProjetoModel } from '../../types/projeto.model.ts';

interface ListaProjetosProps {
    projetos: ProjetoModel[]
}

const ListaProjetos = ({ projetos }: ListaProjetosProps) => {

    const theme = useTheme();

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
