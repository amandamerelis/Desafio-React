import { Api } from '../api/axios-config';
import { UsuarioModel } from '../types/usuario.model.ts';
import { UsuarioDto } from '../types/dto/Usuario.dto.ts';

const buscarTodos = async (): Promise<UsuarioDto[] | Error> => {
    try {
        const { data } = await Api.get('/usuarios');
        if (data) {
            return data;
        } else {
            return new Error('Erro ao listar usuários.');
        }
    } catch (erro: any) {
        if (erro.response) {
            return new Error(erro.response.data.error || 'Erro ao listar usuários.');
        }
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
    } catch (erro: any) {
        if (erro.response) {
            return new Error(erro.response.data.error || 'Erro ao buscar usuário.');
        }
        return new Error((erro as { message: string }).message || 'Erro ao buscar usuário.');
    }

};

const login = async (credenciais: {login: string, senha: string}): Promise<UsuarioModel | Error> => {
    try {
        const { data } = await Api.post('/usuarios/login', credenciais);
        if (data) {
            return data;
        } else {
            return new Error('Erro ao fazer login.');
        }
    } catch (erro: any) {
        if (erro.response) {
            // Erro retornado pelo servidor
            return new Error(erro.response.data.error || 'Erro ao fazer login.');
        }
        return new Error((erro as { message: string }).message || 'Erro ao fazer login.');
    }
};

export const UsuarioService = {
    buscarTodos,
    buscarPorId,
    login
};
