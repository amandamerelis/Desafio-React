import { createContext, useContext, useState } from 'react';
import { UsuarioModel } from '../types/usuario.model.ts';

interface AuthContextData {
    usuarioAtual: UsuarioModel | null;
    login: (novoUsuario: UsuarioModel) => void;
    logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [usuarioAtual, setUsuarioAtual] = useState<UsuarioModel | null>(null);

    const login = (novoUsuario: UsuarioModel) => {
        setUsuarioAtual(novoUsuario);
    };

    const logout = () => {
        setUsuarioAtual(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioAtual: usuarioAtual, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    );
};
