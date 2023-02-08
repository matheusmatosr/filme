import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Header from "./components/Header";
import Erro from "./pages/Erro";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/filme/:id" element={ <Filmes /> } />
                
                <Route path="*" element={ <Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;