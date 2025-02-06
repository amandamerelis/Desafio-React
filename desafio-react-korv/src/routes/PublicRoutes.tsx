import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login.tsx';

export const PublicRoutes = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="*" element={<Navigate to="/login"/>}></Route>
        </Routes>
    );
};
