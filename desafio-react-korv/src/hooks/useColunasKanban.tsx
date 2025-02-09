import { useState, useCallback } from 'react';
import { TarefaModel } from '../types/tarefa.model.ts';
import { SituacaoTarefaEnum } from '../types/enums/situacao-tarefa.enum.ts';
import { ProjetoModel } from '../types/projeto.model.ts';

function useColunasKanban() {

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

    return {
        distribuirTarefasNasColunas,
        colunas
    };
}

export default useColunasKanban;
