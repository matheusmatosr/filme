import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

//  https://api.themoviedb.org/3/movie/550?api_key=b1b0157d17213c11b66e3930c4a75e17

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "b1b0157d17213c11b66e3930c4a75e17",
                    language: "pt-BR",
                    page: 1,
                }
            })

            // console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);
        }

        loadFilmes()
    }, [])

    if(loading){
        <div className='loading'>
            <h2>Carregando filmes...</h2>
        </div>
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
            <div className="detalheFinal">
                <p>@ 2023 by <a href="https://www.linkedin.com/in/matheus-matos-1a523221b/">Matheus Matos</a></p>
            </div>
        </div>
    )
}

export default Home;