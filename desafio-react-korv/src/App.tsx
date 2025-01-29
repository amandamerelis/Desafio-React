import './App.css';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './themes';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {

    return (
        <ThemeProvider theme={LightTheme}>
            <BrowserRouter>
                <AppRoutes></AppRoutes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
