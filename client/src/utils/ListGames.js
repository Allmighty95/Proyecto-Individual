import React from 'react'
import { Link } from 'react-router-dom';

export default function ListGames({ games, page, changePage, api }) {
    return (
        <div>
            <center style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                {
                    //map recorre el arreglo y nos devuelve cada uno de los juegos en game 
                    games.map(game => {
                        return (
                            <div id="gameItem" key={game.id}>
                                <Link className="link" to={'/detail?id=' + game.id + '&api=' + (api === true).toString()}>
                                    <h4 style={{ maxLines: 1 }}>{game.name}</h4>
                                    <img src={game.background_image} className="listedImage" alt={game.name}/>
                                    <p>{"Rating: " + game.rating}</p>
                                    {game.genres && <p>{"Generos: " + (game.genres.map(g => { return g.name }).toString())}</p>}
                                </Link>
                            </div>
                        );
                    })
                }
            </center>
            {page && <div style={{ display: 'flex', flexDirection: 'row', width: '100%', margin: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={
                        () => {
                            changePage(page - 1)
                        }
                    }
                >
                    Anterior
                </button>
                <button
                    onClick={
                        () => {
                            changePage(page + 1)
                        }
                    }
                >
                    Siguiente
                </button>
            </div>}
        </div>
    )
}
