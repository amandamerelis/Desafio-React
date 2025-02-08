import { TarefaModel } from '../../types/tarefa.model';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CardTarefa from '../tarefa/CardTarefa.tsx';
import { useDroppable } from '@dnd-kit/core';
import { SituacaoTarefaEnum } from '../../types/enums/situacao-tarefa.enum.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

interface ColunaProps {
    idColuna: SituacaoTarefaEnum,
    titulo: string,
    tarefas: TarefaModel[],
    onEditarTarefa: (tarefa: TarefaModel) => void,
    idCriadorProjeto: number
}

const Coluna = ({ idColuna, titulo, tarefas, onEditarTarefa, idCriadorProjeto }: ColunaProps) => {

    const { usuarioAtual } = useAuthContext();
    const theme = useTheme();

    const { isOver, setNodeRef } = useDroppable({
        id: idColuna,
    });

    function podeEditar(tarefa: TarefaModel): boolean {
        if (usuarioAtual) {
            return tarefa.criador.id === usuarioAtual.id || idCriadorProjeto === usuarioAtual.id;
        }
        return false;
    }

    return (
        <Paper ref={setNodeRef}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
                padding: 2, flexGrow: 1, maxWidth: theme.spacing(110), height: '100%'
            }}>
            <Typography variant="h6">{titulo}</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 3,
                width: '100%'
            }}>

                <SortableContext items={tarefas.map(t => t.id)} strategy={verticalListSortingStrategy} id={idColuna}>

                    {tarefas.map((tarefa) => (
                        <Box
                            key={tarefa.id}
                            sx={{ marginY: 2, alignSelf: 'center', width: '100%' }}>
                            <CardTarefa
                                tarefa={tarefa}
                                onEditar={onEditarTarefa}
                                canEdit={podeEditar(tarefa)}
                            />
                        </Box>
                    ))}

                </SortableContext>
            </Box>
        </Paper>
    );
};

export default Coluna;
