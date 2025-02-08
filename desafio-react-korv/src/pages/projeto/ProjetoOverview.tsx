import LayoutBase from '../../layouts/layout-pagina-base/LayoutBase.tsx';
import { Box, Button, useTheme } from '@mui/material';
import { Add, Group } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { ProjetoModel } from '../../types/projeto.model.ts';
import FormTarefa from '../../components/tarefa/FormTarefa.tsx';
import { useParams } from 'react-router-dom';
import { ProjetoService } from '../../services/ProjetoService.ts';
import { TarefaModel } from '../../types/tarefa.model.ts';
import { TarefaService } from '../../services/TarefaService.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import ListaParticipantes from '../../components/usuarios/ListaParticipantes.tsx';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SituacaoTarefaEnum } from '../../types/enums/situacao-tarefa.enum.ts';
import Coluna from '../../components/coluna/Coluna.tsx';

const ProjetoOverview = () => {

    const { id } = useParams<'id'>();
    const { usuarioAtual } = useAuthContext();

    const buscarProjetoPorId = useCallback(async (id: number) => {
        try {
            const projeto = await ProjetoService.buscarPorId(id);
            if (projeto instanceof Error) {
                alert('Erro ao buscar projeto');
            } else {
                setProjeto(projeto);
                distribuirTarefasNasColunas(projeto);
            }
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
        }
    }, []);

    const [colunas, setColunas] = useState({
        pendente: {
            id: SituacaoTarefaEnum.PENDENTE,
            titulo: SituacaoTarefaEnum.PENDENTE,
            tarefas: [] as TarefaModel[]
        },
        emProgresso: {
            id: SituacaoTarefaEnum.EM_PROGRESSO,
            titulo: SituacaoTarefaEnum.EM_PROGRESSO,
            tarefas: [] as TarefaModel[]
        },
        feito: {
            id: SituacaoTarefaEnum.FEITO,
            titulo: SituacaoTarefaEnum.FEITO,
            tarefas: [] as TarefaModel[]
        },
    });

    const [projeto, setProjeto] = useState<ProjetoModel>();
    const [tarefaFormData, setTarefaFormData] = useState<TarefaModel | null>(null);

    const [formTaskOpen, setFormTaskOpen] = useState(false);
    const [listaParticipantesOpen, setListaParticipantesOpen] = useState(false);

    useEffect(() => {
        if (id) {
            buscarProjetoPorId(parseInt(id));
        }
    }, [id, buscarProjetoPorId]);

    const handleNovaTarefa = () => {
        setTarefaFormData(null);
        setFormTaskOpen(true);
    };

    const handleEditarTarefa = (tarefa: TarefaModel) => {
        setTarefaFormData(tarefa);
        setFormTaskOpen(true);

    };

    const distribuirTarefasNasColunas = useCallback((projetoAtualizado: ProjetoModel) => {
        if (!projetoAtualizado) return;

        setColunas(prevState => ({
            ...prevState,
            pendente: {
                ...prevState.pendente,
                tarefas: projetoAtualizado.tarefas.filter(tarefa => tarefa.situacao === SituacaoTarefaEnum.PENDENTE),
            },
            emProgresso: {
                ...prevState.emProgresso,
                tarefas: projetoAtualizado.tarefas.filter(tarefa => tarefa.situacao === SituacaoTarefaEnum.EM_PROGRESSO),
            },
            feito: {
                ...prevState.feito,
                tarefas: projetoAtualizado.tarefas.filter(tarefa => tarefa.situacao === SituacaoTarefaEnum.FEITO),
            }
        }));
    }, []);


    const handleOnClose = (dados: Partial<TarefaModel> | null) => {
        if (dados && projeto && usuarioAtual) {
            dados.projetoId = projeto.id;
            if (dados.id) {
                TarefaService.atualizarPorId(dados.id, dados).then(() => {
                    TarefaService.buscarPorProjetoId(projeto.id).then(resp => setProjeto(prev => {
                        prev!.tarefas = resp;
                        return prev;
                    }));
                });
            } else {
                dados.criador = usuarioAtual;
                dados.dataCriacao = new Date();
                TarefaService.criar(dados)
                    .then(() => {
                        return TarefaService.buscarPorProjetoId(projeto.id);
                    })
                    .then(tarefasAtualizadas => {
                        setProjeto(prev => prev ? {
                            ...prev,
                            tarefas: tarefasAtualizadas
                        } : prev);
                        distribuirTarefasNasColunas({ ...projeto, tarefas: tarefasAtualizadas });
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar tarefa:', error);
                    });
            }
        }
        setTarefaFormData(null);
        setFormTaskOpen(false);
    };

    const atualizarTarefa = useCallback(async (idTarefa: number, tarefa: Partial<TarefaModel>) => {
        if (!projeto) return;

        try {
            await TarefaService.atualizarPorId(idTarefa, tarefa);
            const tarefasAtualizadas = await TarefaService.buscarPorProjetoId(projeto.id);

            setProjeto(prev => prev ? { ...prev, tarefas: tarefasAtualizadas } : prev);
            distribuirTarefasNasColunas({ ...projeto, tarefas: tarefasAtualizadas });
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    }, [projeto, distribuirTarefasNasColunas]);


    const handleDragEnd = useCallback(async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !active.data.current) return;

        const tarefaAtualizada = { situacao: over.id as SituacaoTarefaEnum };

        try {
            await atualizarTarefa(Number(active.id), tarefaAtualizada);
        } catch (error) {
            console.error('Erro ao mover tarefa:', error);
        }
    }, [atualizarTarefa]);


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


                <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItens: 'flex-start',
                        gap: 6,
                        height: '100%'
                    }}>
                        {Object.values(colunas).map((coluna) => (
                            <Coluna
                                key={coluna.id}
                                idColuna={coluna.id}
                                titulo={coluna.titulo}
                                tarefas={coluna.tarefas}
                                onEditarTarefa={handleEditarTarefa}
                                idCriadorProjeto={projeto.criador.id}
                            />
                        ))}
                    </Box>
                </DndContext>
                {/*{projeto && usuarioAtual && tarefas.map((tarefa) => (*/}
                {/*    <CardTarefa key={tarefa.id} tarefa={tarefa} onEditar={handleEditarTarefa} canEdit={podeEditar(tarefa)}/>*/}
                {/*))}*/}

                <FormTarefa open={formTaskOpen} onClose={handleOnClose} dados={tarefaFormData}/>
                <ListaParticipantes projeto={projeto} open={listaParticipantesOpen}
                    onClose={() => setListaParticipantesOpen(false)}/>
            </Box>}
        </LayoutBase>
    );
};

export default ProjetoOverview;
