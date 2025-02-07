import LayoutBase from '../../layouts/layout-pagina-base/LayoutBase.tsx';
import { Box, Button, useTheme } from '@mui/material';
import { Add, Group } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ProjetoModel } from '../../types/projeto.model.ts';
import FormTarefa from '../../components/tarefa/FormTarefa.tsx';
import { useParams } from 'react-router-dom';
import { ProjetoService } from '../../services/ProjetoService.ts';
import CardTarefa from '../../components/tarefa/CardTarefa.tsx';
import { TarefaModel } from '../../types/tarefa.model.ts';
import { TarefaService } from '../../services/TarefaService.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import ListaParticipantes from '../../components/usuarios/ListaParticipantes.tsx';

const ProjetoOverview = () => {

    const { id } = useParams<'id'>();
    const { usuarioAtual } = useAuthContext();

    useEffect(() => {
        if (id) {
            ProjetoService.buscarPorId(parseInt(id))
                .then(resposta => {
                    setProjeto(resposta);
                    setTarefas(resposta.tarefas);
                });
        }

    }, [id]);

    const [projeto, setProjeto] = useState<ProjetoModel>();
    const [tarefas, setTarefas] = useState<TarefaModel[]>([]);
    const [tarefaFormData, setTarefaFormData] = useState<TarefaModel | null>(null);

    const [formTaskOpen, setFormTaskOpen] = useState(false);
    const [listaParticipantesOpen, setListaParticipantesOpen] = useState(false);

    const handleNovaTarefa = () => {
        setTarefaFormData(null);
        setFormTaskOpen(true);
    };

    const handleOnClose = (dados: Partial<TarefaModel> | null) => {
        if (dados && projeto && usuarioAtual) {
            dados.projetoId = projeto.id;
            if (dados.id) {
                TarefaService.atualizarPorId(dados.id, dados).then(() => {
                    TarefaService.buscarPorProjetoId(projeto.id).then(resp => setTarefas(resp));
                });
            } else {
                dados.criador = usuarioAtual;
                dados.dataCriacao = new Date();
                TarefaService.criar(dados).then(() => {
                    TarefaService.buscarPorProjetoId(projeto.id).then(resp => setTarefas(resp));
                });
            }
        }
        setTarefaFormData(null);
        setFormTaskOpen(false);
    };

    const theme = useTheme();
    return (
        <LayoutBase titulo="Página inicial">
            {projeto && <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ width: '100%', textAlign: 'end', marginBottom: 6 }}>
                    <Button variant="contained"
                        sx={{
                            paddingX: theme.spacing(10),
                            bgcolor: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            marginRight: 6,
                        }} startIcon={<Group/>} onClick={() => setListaParticipantesOpen(true)}>
                        Participantes
                    </Button>
                    <Button variant="contained"
                        sx={{
                            paddingX: theme.spacing(10),
                            bgcolor: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            marginRight: 6,
                        }} startIcon={<Add/>}
                        onClick={handleNovaTarefa}>
                        Nova task
                    </Button>
                </Box>


                {projeto && tarefas.map((tarefa) => (
                    <CardTarefa key={tarefa.id} tarefa={tarefa}/>
                ))}

                <FormTarefa open={formTaskOpen} onClose={handleOnClose} dados={tarefaFormData}/>
                <ListaParticipantes projeto={projeto} open={listaParticipantesOpen} onClose={() => setListaParticipantesOpen(false)}/>
            </Box> }
        </LayoutBase>
    );
};

export default ProjetoOverview;
