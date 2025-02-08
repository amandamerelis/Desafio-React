import { Api } from '../api/axios-config';
import { ProjetoModel } from '../types/projeto.model.ts';

const buscarPorId = async (id: number): Promise<ProjetoModel | Error> => {

    try {
        const { data } = await Api.get(`/projetos/${id}`);
        return data;
    } catch (erro) {
        console.error(erro);
        throw Error((erro as { message: string }).message || 'Erro ao buscar projeto.');
    }

};

const buscarPorParticipanteId = async (idUsuario: number): Promise<ProjetoModel[]> => {
    try {
        const { data } = await Api.get(`/projetos/buscar-por-usuario/${idUsuario}`);
        return data;
    } catch (erro) {
        const mensagem: string = (erro as { message: string }).message || 'Erro ao buscar projetos.';
        console.error(erro);
        alert(mensagem);
        throw Error(mensagem);
    }
};

const criar = async (projeto: Partial<ProjetoModel>): Promise<number> => {
    try {
        const { data } = await Api.post('/projetos', projeto);
        return data.id;
    } catch (erro) {
        console.error(erro);
        throw Error((erro as { message: string }).message || 'Erro ao criar projeto.');
    }
};

const atualizarPorId = async (id: number, projeto: Partial<ProjetoModel>): Promise<ProjetoModel | Error> => {
    try {
        const { data } = await Api.put(`/projetos/${id}`, projeto);
        return data;
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao atualizar projeto.');
    }
};

const excluirPorId = async (id: number): Promise<void> => {
    try {
        await Api.delete(`/projetos/${id}`);
    } catch (erro) {
        console.error(erro);
        throw Error((erro as { message: string }).message || 'Erro ao excluir projeto.');
    }
};

export const ProjetoService = {
    buscarPorId,
    buscarPorParticipanteId,
    criar,
    atualizarPorId,
    excluirPorId
};
