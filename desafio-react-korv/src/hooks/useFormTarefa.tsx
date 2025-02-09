import { useCallback, useState } from 'react';
import { TarefaModel } from '../types/tarefa.model.ts';
import { useAuthContext } from '../contexts/AuthContext.tsx';
import { TarefaService } from '../services/TarefaService.ts';

function useFormTarefa() {
    const [isFormTarefaOpen, setIsFormTarefaOpen] = useState(false);
    const [formDataTarefa, setFormDataTarefa] = useState<TarefaModel | null>(null);
    const { usuarioAtual } = useAuthContext();

    const novoRegistro = useCallback(() => {
        setFormDataTarefa(null);
        setIsFormTarefaOpen(true);
    }, []);

    const editarRegistro = useCallback((data: TarefaModel) => {
        setFormDataTarefa(data);
        setIsFormTarefaOpen(true);
    }, []);

    const fecharFormTarefa = useCallback(() => {
        setIsFormTarefaOpen(false);
        setFormDataTarefa(null);  // Limpa o estado ao fechar
    }, []);

    const salvarTarefa = useCallback(async (data: Partial<TarefaModel>, projetoId: number) => {
        if (!data || !usuarioAtual) return Promise.reject('Dados ou usuário inválidos');

        try {
            data.projetoId = projetoId;

            let resultado;
            if (data.id) {
                // Atualizar tarefa existente
                resultado = await TarefaService.atualizarPorId(data.id, data);
                if (resultado instanceof Error) {
                    alert('Erro ao atualizar tarefa.' + resultado.message);
                }
            } else {
                // Criar nova tarefa
                data.criador = usuarioAtual;
                data.dataCriacao = new Date();
                resultado = await TarefaService.criar(data);
                if (resultado instanceof Error) {
                    alert('Erro ao salvar tarefa.' + resultado.message);
                }
            }

            // Buscar a lista de tarefas atualizada
            const tarefasAtualizadas = await TarefaService.buscarPorProjetoId(projetoId);
            return tarefasAtualizadas;
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
            return Promise.reject(error);
        }
    }, [usuarioAtual]);

    return {
        isFormTarefaOpen,
        formDataTarefa,
        novoRegistro,
        editarRegistro,
        fecharFormTarefa,
        salvarTarefa
    };
}

export default useFormTarefa;
