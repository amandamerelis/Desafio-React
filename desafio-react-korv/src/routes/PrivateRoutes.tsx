import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.tsx';
import ProjetoOverview from '../pages/projeto/ProjetoOverview.tsx';

export const PrivateRoutes = () => {

    return (
        <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/projetos/:id" element={<ProjetoOverview/>}></Route>
            <Route path="*" element={<Navigate to="/home"/>}></Route>
        </Routes>
    );
};
