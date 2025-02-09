import { TarefaModel } from '../types/tarefa.model.ts';
import { SituacaoTarefaEnum } from '../types/enums/situacao-tarefa.enum.ts';

type Direcao = 'avancar' | 'retroceder';

function useMudarSituacaoTarefa() {

    const mudarSituacao = (tarefa: TarefaModel, direcao: Direcao): TarefaModel => {
        const tarefaAtualizada = { ...tarefa } as TarefaModel;
        switch (tarefa.situacao) {
        case SituacaoTarefaEnum.PENDENTE:
            if (direcao === 'avancar') {
                tarefaAtualizada.situacao = SituacaoTarefaEnum.EM_PROGRESSO;
            }
            break;
        case SituacaoTarefaEnum.EM_PROGRESSO:
            if (direcao === 'avancar') {
                tarefaAtualizada.situacao = SituacaoTarefaEnum.FEITO;
            } else {
                tarefaAtualizada.situacao = SituacaoTarefaEnum.PENDENTE;
            }
            break;
        case SituacaoTarefaEnum.FEITO:
            if (direcao === 'retroceder') {
                tarefaAtualizada.situacao = SituacaoTarefaEnum.EM_PROGRESSO;
            }
            break;
        }

        return tarefaAtualizada;

    };

    return {
        mudarSituacao
    };
}

export default useMudarSituacaoTarefa;
