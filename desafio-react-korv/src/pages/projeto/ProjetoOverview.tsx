import LayoutBase from '../../layouts/layout-pagina-base/LayoutBase.tsx';
import { Box, Button, useTheme } from '@mui/material';
import { Add, Group } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { ProjetoModel } from '../../types/projeto.model.ts';
import FormTarefa from '../../components/tarefa/FormTarefa.tsx';
import { useParams } from 'react-router-dom';
import { ProjetoService } from '../../services/ProjetoService.ts';
import { TarefaModel } from '../../types/tarefa.model.ts';
import ListaParticipantes from '../../components/usuarios/ListaParticipantes.tsx';
import useFormTarefa from '../../hooks/useFormTarefa.tsx';
import useColunasKanban from '../../hooks/useColunasKanban.tsx';
import { useProjetoContext } from '../../contexts/ProjetoContext.tsx';
import Coluna from '../../components/coluna/Coluna.tsx';
import { TarefaService } from '../../services/TarefaService.ts';

const ProjetoOverview = () => {

    const { id } = useParams<'id'>();
    const {
        isFormTarefaOpen,
        novoRegistro,
        editarRegistro,
        formDataTarefa,
        fecharFormTarefa,
        salvarTarefa
    } = useFormTarefa();
    const { colunas, distribuirTarefasNasColunas } = useColunasKanban();

    const buscarProjetoPorId = useCallback((id: number) => {
        try {
            ProjetoService.buscarPorId(id).then((projeto) => {
                if (projeto instanceof Error) {
                    alert('Erro ao buscar projeto');
                } else {
                    setProjeto(projeto);
                    distribuirTarefasNasColunas(projeto);
                }
            });
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
        }
    }, [distribuirTarefasNasColunas]);

    const [projeto, setProjeto] = useState<ProjetoModel>();
    const [listaParticipantesOpen, setListaParticipantesOpen] = useState(false);
    const { atualizarProjeto } = useProjetoContext();

    useEffect(() => {
        if (id) {
            buscarProjetoPorId(parseInt(id));
        }
    }, [id, buscarProjetoPorId]);

    const handleNovaTarefa = () => {
        novoRegistro();
    };

    const handleEditarTarefa = (tarefa: TarefaModel) => {
        editarRegistro(tarefa);
    };

    const handleExcluirTarefa = useCallback(async (idTarefa: number) => {
        await TarefaService.excluirPorId(idTarefa, projeto!.id);
        TarefaService.buscarPorProjetoId(projeto!.id).then(resposta => {

            const projetoAtualizado = {
                ...projeto,
                tarefas: resposta
            } as ProjetoModel;

            setProjeto(projetoAtualizado);
            atualizarProjeto(projetoAtualizado);
            distribuirTarefasNasColunas(projetoAtualizado);
        });
    }, [projeto, atualizarProjeto, distribuirTarefasNasColunas]);

    const handleOnCloseTarefaForm = (dados: Partial<TarefaModel> | null) => {
        if (dados && projeto) {
            salvarTarefa(dados, projeto.id).then(tarefasAtualizadas => {

                const projetoAtualizado = {
                    ...projeto,
                    tarefas: tarefasAtualizadas,
                } as ProjetoModel;

                setProjeto(projetoAtualizado);
                atualizarProjeto(projetoAtualizado);
                distribuirTarefasNasColunas(projetoAtualizado);
            });
        }
        fecharFormTarefa();
    };

    const handleMudarSituacaoTarefa = (tarefa: TarefaModel) => {

        if (projeto) {
            salvarTarefa(tarefa, projeto.id).then(tarefasAtualizadas => {
                const projetoAtualizado = {
                    ...projeto,
                    tarefas: tarefasAtualizadas,
                } as ProjetoModel;

                setProjeto(projetoAtualizado);
                atualizarProjeto(projetoAtualizado);
                distribuirTarefasNasColunas(projetoAtualizado);
            });
        }

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

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItens: 'flex-start',
                    gap: 6
                }}>

                    {Object.values(colunas).map((coluna) => (
                        <Coluna
                            key={coluna.id}
                            titulo={coluna.titulo}
                            tarefas={coluna.tarefas}
                            onEditarTarefa={handleEditarTarefa}
                            onExcluirTarefa={handleExcluirTarefa}
                            onMudarSituacao={handleMudarSituacaoTarefa}
                            idCriadorProjeto={projeto.criador.id}
                        />
                    ))}

                </Box>

                <FormTarefa open={isFormTarefaOpen} onClose={handleOnCloseTarefaForm} dados={formDataTarefa}/>
                <ListaParticipantes projeto={projeto} open={listaParticipantesOpen}
                    onClose={() => setListaParticipantesOpen(false)}/>
            </Box>}
        </LayoutBase>
    );
};

export default ProjetoOverview;
