import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ProjetoModel } from '../types/projeto.model.ts';
import { ProjetoService } from '../services/ProjetoService.ts';

interface ProjetoContextData {
    projetos: ProjetoModel[];
    buscarProjetos: () => void;
    atualizarProjeto: (projeto: ProjetoModel) => void,
    atualizarListaProjetos: (projeto: ProjetoModel[]) => void
}

interface ProjetoProviderProps {
    children: React.ReactNode,
    usuarioId: number
}

const ProjetoContext = createContext({} as ProjetoContextData);

export function ProjetoProvider({ children, usuarioId }: ProjetoProviderProps) {
    const [projetos, setProjetos] = useState<ProjetoModel[]>([]);

    const buscarProjetos = useCallback(() => {
        if (usuarioId) {
            try {
                ProjetoService.buscarPorParticipanteId(usuarioId)
                    .then(resposta => setProjetos(resposta));

            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
            }
        }
    }, [usuarioId]);

    const atualizarProjeto = useCallback((projetoAtualizado: ProjetoModel) => {
        if (projetos) {
            setProjetos((prevProjetos) =>
                prevProjetos.map((p) => (p.id === projetoAtualizado.id ? projetoAtualizado : p))
            );
        }
    }, [projetos]);

    const atualizarListaProjetos = useCallback((projetos: ProjetoModel[]) => {
        setProjetos(projetos);
    }, []);

    useEffect(() => {
        buscarProjetos();
    }, [buscarProjetos]);

    return (
        <ProjetoContext.Provider value={{ projetos, buscarProjetos, atualizarProjeto, atualizarListaProjetos }}>
            {children}
        </ProjetoContext.Provider>
    );
}

export const useProjetoContext = () => {
    const context = useContext(ProjetoContext);
    if (!context) {
        throw new Error('useProjetoContext deve ser usado dentro de um ProjetoProvider');
    }
    return context;
};
