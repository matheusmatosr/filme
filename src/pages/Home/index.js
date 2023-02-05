import React, { useEffect, useState } from 'react';
import api from '../../services/api';

//  https://api.themoviedb.org/3/movie/550?api_key=b1b0157d17213c11b66e3930c4a75e17

function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "b1b0157d17213c11b66e3930c4a75e17",
                    language: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results);
        }

        loadFilmes()
    }, [])

    return(
        <div>
            <h1>Bem vindo a home</h1>
        </div>
    )
}

export default Home;