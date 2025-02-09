import { TarefaModel } from '../../types/tarefa.model';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import CardTarefa from '../tarefa/CardTarefa.tsx';
import { SituacaoTarefaEnum } from '../../types/enums/situacao-tarefa.enum.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

interface ColunaProps {
    titulo: string,
    tarefas: TarefaModel[],
    onEditarTarefa: (tarefa: TarefaModel) => void,
    onExcluirTarefa: (idTarefa: number) => void,
    onMudarSituacao: (tarefa: TarefaModel) => void,
    idCriadorProjeto: number
}

const Coluna = ({ titulo, tarefas, onEditarTarefa, onExcluirTarefa, idCriadorProjeto, onMudarSituacao }: ColunaProps) => {

    const { usuarioAtual } = useAuthContext();
    const theme = useTheme();

    function podeEditar(tarefa: TarefaModel): boolean {
        if (usuarioAtual) {
            return tarefa.situacao !== SituacaoTarefaEnum.FEITO && (tarefa.criador.id === usuarioAtual.id || idCriadorProjeto === usuarioAtual.id);
        }
        return false;
    }

    const handleEditarTarefa = (tarefa: TarefaModel) => {
        onEditarTarefa(tarefa);
    };

    const handleExcluirTarefa = (idTarefa: number) => {
        onExcluirTarefa(idTarefa);
    };

    const handleMudarSituacao = (tarefas: TarefaModel) => {
        onMudarSituacao(tarefas);
    };

    return (
        <Paper
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
                padding: 2, width: theme.spacing(95)
            }}>
            <Typography variant="h6">{titulo}</Typography>

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginX: 'auto'
            }}>

                {tarefas.map((tarefa) => (
                    <Box
                        key={tarefa.id}
                        sx={{ marginY: 2, alignSelf: 'center', width: '100%' }}>
                        <CardTarefa
                            tarefa={tarefa}
                            onEditar={handleEditarTarefa}
                            onExcluir={handleExcluirTarefa}
                            onMudarSituacao={handleMudarSituacao}
                            canEdit={podeEditar(tarefa)}
                        />
                    </Box>
                ))}

            </Box>
        </Paper>
    );
};

export default Coluna;
