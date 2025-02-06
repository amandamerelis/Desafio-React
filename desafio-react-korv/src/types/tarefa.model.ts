import { UsuarioModel } from './usuario.model.ts';
import { SituacaoTarefaEnum } from './enums/situacao-tarefa.enum.ts';

export interface TarefaModel {
    id: number,
    titulo: string,
    descricao: string,
    tags: string[],
    situacao: SituacaoTarefaEnum,
    criador: UsuarioModel,
    dataCriacao: Date,
    projetoId: number
}
