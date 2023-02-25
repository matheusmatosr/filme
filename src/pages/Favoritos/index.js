import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos(){

    const [ filmes, setFilmes ] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@matosflix");
        setFilmes(JSON.parse(minhaLista) || [])
    
    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@matosflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes favotiros</h1>
            &nbsp;
            
            {filmes.length === 0 && <h3>Ops, você não tem nenhum filme salvo :( </h3>}
    
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)} className="buttonExcluir">Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Link className='buttonEscolher' to="/">Escolher</Link>
        </div>
    )
}

export default Favoritos;