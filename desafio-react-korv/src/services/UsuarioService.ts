import { Api } from '../api/axios-config';
import { UsuarioModel } from '../types/usuario.model.ts';
import { UsuarioDto } from '../types/dto/Usuario.dto.ts';

const buscarTodos = async (): Promise<UsuarioDto[] | Error> => {
    try {
        const { data } = await Api.get('/usuarios');
        if (data) {
            return data;
        } else {
            return new Error('Erro ao listar usuário.');
        }
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao listar usuários.');
    }
};

const buscarPorId = async (id: number): Promise<UsuarioModel | Error> => {

    try {
        const { data } = await Api.get(`/usuarios/${id}`);
        if (data) {
            return data;
        } else {
            return new Error('Erro ao buscar usuário.');
        }
    } catch (erro) {
        console.error(erro);
        return new Error((erro as { message: string }).message || 'Erro ao buscar usuário.');
    }

};

const login = async (): Promise<any> => {
    //TODO: criar método de login
};

export const UsuarioService = {
    buscarTodos,
    buscarPorId,
    login
};
