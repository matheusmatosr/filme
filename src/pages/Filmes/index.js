import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filmes.css';
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "b1b0157d17213c11b66e3930c4a75e17",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não encontrado");
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@matosflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

        if (hasFilmes) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@matosflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando filmes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-detalhes">
            <h1>Filme: {filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            
            <h3>Detalhes:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a 
                        target="blank" 
                        rel="externa" 
                        href={`https://youtube.com/results?search_query=${filme.title} trailer`}
                        >
                        Trailer
                    </a>
                </button>
            </div>
            <div className="detalheFinal">
                <p>@ 2023 by <a href="https://www.linkedin.com/in/matheus-matos-1a523221b/">Matheus Matos</a></p>
            </div>
        </div>
    )
}

export default Filme;