import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/home" element={<p>Home</p>}></Route>
            <Route path="*" element={<Navigate to="home"/>}></Route>
        </Routes>
    );
};
