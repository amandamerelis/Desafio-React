import { createContext, useContext, useEffect, useState } from 'react';
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


    useEffect(() => {
        const usuarioLocalStorage = localStorage.getItem('usuario');
        if (usuarioLocalStorage) {
            setUsuarioAtual(JSON.parse(usuarioLocalStorage));
        }
    }, []);


    const login = (novoUsuario: UsuarioModel) => {
        setUsuarioAtual(novoUsuario);
        localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    };

    const logout = () => {
        setUsuarioAtual(null);
        localStorage.setItem('usuario', JSON.stringify(null));
    };

    return (
        <AuthContext.Provider value={{ usuarioAtual: usuarioAtual, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    );
};
