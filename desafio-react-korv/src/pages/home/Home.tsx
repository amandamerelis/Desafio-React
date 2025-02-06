import LayoutBase from '../../layouts/layout-pagina-base/LayoutBase.tsx';
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <LayoutBase titulo="Página inicial">
            <Typography variant="h3">Bem vindo(a) ao sistema!</Typography>
            <Typography variant="body1">Para ver suas tarefas, selecione um projeto no menu lateral.</Typography>
        </LayoutBase>
    );
};

export default Home;
