import { UsuarioModel } from './usuario.model.ts';
import { TarefaModel } from './tarefa.model.ts';

export interface ProjetoModel {
    id: number,
    titulo: string,
    descricao: string,
    tarefas: TarefaModel[],
    criador: UsuarioModel,
    participantes: UsuarioModel[]
}
