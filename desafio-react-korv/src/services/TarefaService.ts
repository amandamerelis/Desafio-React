import { Api } from '../api/axios-config';
import { TarefaModel } from '../types/tarefa.model.ts';
import { SituacaoTarefaEnum } from '../types/enums/situacao-tarefa.enum.ts';
import { ProjetoModel } from '../types/projeto.model.ts';

const buscarPorId = async (id: number): Promise<TarefaModel | Error> => {

    try {
        const { data } = await Api.get(`/tarefas/${id}`);
        if (data) {
            return data;
        } else {
            return new Error('Erro ao buscar tarefa.');
        }
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao buscar tarefa.');
    }

};

const criar = async (tarefa: Partial<TarefaModel>): Promise<number | Error> => {
    try {
        tarefa.situacao = SituacaoTarefaEnum.PENDENTE;
        const { data } = await Api.post('/tarefas', tarefa);
        atualizarProjetoComTarefaNova(data);
        return data.id;
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao criar tarefa.');
    }
};

const atualizarPorId = async (id: number, tarefa: Partial<TarefaModel>): Promise<number | Error> => {
    try {
        const { data } = await Api.put(`/tarefas/${id}`, tarefa);
        atualizarProjetoComTarefaAtualizada(data);
        return data.id;
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao atualizar tarefa.');
    }
};

const excluirPorId = async (idTarefa: number, idProjeto: number): Promise<void | Error> => {
    try {
        await Api.delete(`/tarefas/${idTarefa}`);
        atualizarProjetoAposExcluirTarefa(idTarefa, idProjeto);
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao excluir tarefa.');
    }
};

const buscarPorProjetoId = async (idProjeto: number): Promise<TarefaModel[]> => {
    try {
        const { data } = await Api.get(`/tarefas/buscar-por-projeto/${idProjeto}`);
        return data;
    } catch (erro) {
        const mensagem: string = (erro as { message: string }).message || 'Erro ao buscar tarefas.';
        console.error(erro);
        alert(mensagem);
        throw Error(mensagem);
    }
};

function atualizarProjetoAposExcluirTarefa(idTarefa: number, idProjeto: number) {
    Api.get(`/projetos/${idProjeto}`)
        .then(response => {
            const projeto = response.data as ProjetoModel;
            const tarefasAtualizadas = projeto.tarefas.filter((tarefa) => tarefa.id !== idTarefa);

            Api.put(`/projetos/${projeto.id}`, {
                ...projeto,
                tarefas: tarefasAtualizadas
            })
                .then();
        });
}

function atualizarProjetoComTarefaNova(tarefaCriada: TarefaModel) {
    Api.get(`/projetos/${tarefaCriada.projetoId}`)
        .then(response => {
            const projeto = response.data as ProjetoModel;
            const tarefasAtualizadas = [...projeto.tarefas, tarefaCriada];

            Api.put(`/projetos/${projeto.id}`, {
                ...projeto,
                tarefas: tarefasAtualizadas
            })
                .then();
        });
}

function atualizarProjetoComTarefaAtualizada(tarefaAtualizada: TarefaModel) {
    Api.get(`/projetos/${tarefaAtualizada.projetoId}`)
        .then(response => {
            const projeto = response.data as ProjetoModel;
            // Encontrar o índice correto da tarefa usando o ID
            const index = projeto.tarefas.findIndex(t => t.id === tarefaAtualizada.id);

            if (index !== -1) {
                // Criar um novo array de tarefas com a tarefa atualizada
                const tarefasAtualizadas = [
                    ...projeto.tarefas.slice(0, index),
                    tarefaAtualizada,
                    ...projeto.tarefas.slice(index + 1)
                ];

                Api.put(`/projetos/${projeto.id}`, {
                    ...projeto,
                    tarefas: tarefasAtualizadas
                })
                    .then();
            }
        });
}

export const TarefaService = {
    buscarPorId,
    criar,
    atualizarPorId,
    excluirPorId,
    buscarPorProjetoId
};
