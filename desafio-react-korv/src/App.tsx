import './App.css'
import {ThemeProvider} from "@mui/material";
import {LightTheme} from "./themes";

function App() {

    return (
        <ThemeProvider theme={LightTheme}>
        </ThemeProvider>
    )
}

export default App
