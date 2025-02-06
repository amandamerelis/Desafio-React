import { createContext, useCallback, useContext, useState } from 'react';
import { useTheme } from '@mui/material';

interface DrawerContextData {
    isMenuAberto: boolean;
    toggleMenuLateral: () => void;
    larguraDrawer: number
}

const MenuLateralContext = createContext({} as DrawerContextData);

export const useMenuLateralContext = () => {
    return useContext(MenuLateralContext);
};

interface MenuLateralProviderProps {
    children: React.ReactNode;
}

export const MenuLateralProvider = ({ children }: MenuLateralProviderProps) => {
    const [isMenuAberto, setIsMenuAberto] = useState(false);

    const toggleMenuLateral = useCallback(() => {
        setIsMenuAberto(prev => !prev);
    }, []);

    const theme = useTheme();
    const larguraDrawer = parseInt(theme.spacing(75));

    return (
        <MenuLateralContext.Provider
            value={{ isMenuAberto: isMenuAberto, toggleMenuLateral: toggleMenuLateral, larguraDrawer: larguraDrawer }}>
            {children}
        </MenuLateralContext.Provider>
    );
};
