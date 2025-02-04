import { UsuarioModel } from './usuario.model.ts';

export interface TarefaModel {
    id: number,
    nome: string,
    descricao: string,
    criador: UsuarioModel,
    tags: string[]
}
