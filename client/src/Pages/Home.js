import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';
import ListGames from '../utils/ListGames';


function Home({ state, fetchGames, fetchGamesByName, fetchGenres, fetchCreatedGames, filterGames }) {

    const { games, loading, loadingSearch, foundGames, genres, createdGames, filteredGames } = state

    const [filteredCreatedGames, setFilteredCreatedGames] = useState([])

    const [ascending, setAscending] = useState(false)

    const [ascendingRating, setAscendingRating] = useState(false)

    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchCreatedGames()
        if (games.length < 1) {
            extractData(1)
            fetchGenres()
        }
    }, [])

    const extractData = (p) => {
        setPage(p)
        fetchGames(p)
    }

    var searchValue = ""

    const searchGames = () => {
        fetchGamesByName(searchValue)
    }

    return (
        <div>
            <h1 id="title" >Todos los juegos que puedas imaginar</h1>
            <div id="homeBody">
                <div id="searchInput">
                    {/* Input de busqueda */}
                    <h2 id="title2">Quiero buscar por nombre</h2>
                    <input type="text" placeholder="God Of War" onChange={(event) => {
                        searchValue = event.target.value;
                    }} />

                    {/* Boton de buscar */}
                    <button onClick={() => { searchGames(1) }}>
                        Buscar
                    </button>
                </div>
                <div id="filtersInput">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 id="title2">Filtrar por genero, nombre o rating</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 >Filtar por genero: </h2>
                            {/* Dropdown de los generos */}
                            <select onChange={(event) => {
                                filterGames({ games, filter: 'genre', payload: event.target.value });
                            }} name="genre" id="genre" >
                                <option value={null} >Seleccionar un genero</option>
                                {
                                    genres.map(genre => {
                                        return (
                                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                                        );
                                    })
                                }
                            </select>

                        </div>
                        {/* Boton de rating */}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <button style={{ width: '30%', margin: 16 }} onClick={() => {
                                filterGames({ games, filter: 'name', payload: !ascending })
                                setAscending(!ascending)
                            }}>
                                Ordenar por nombre
                                {ascending ? " descendente" : " ascendente"}
                            </button>

                            {/* Boton de rating */}
                            <button style={{ width: '30%', margin: 16 }} onClick={() => {
                                filterGames({ games, filter: 'rating', payload: !ascendingRating })
                                setAscendingRating(!ascendingRating)
                            }}>
                                Ordenar por rating
                                {ascendingRating ? " descendente" : " ascendente"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Juegos Creados */}
                {
                    createdGames.length >= 1 &&
                    < div  >
                        <h2 id="title2">Creados por el usuario</h2>
                        {
                            loadingSearch ? "Cargando..." : <ListGames games={filteredCreatedGames.length >= 1 ? filteredCreatedGames : createdGames} />
                        }
                    </div>
                }
                {/* Juegos Encontrados */}
                {
                    foundGames.length >= 1 &&
                    < div  >
                        <h2 id="title2">Resultados de la busqueda</h2>
                        {
                            loadingSearch ? "Cargando..." : <ListGames games={foundGames} api />
                        }
                    </div>
                }
                {/* Juegos Por Defecto */}
                {
                    <div >
                        <h2 id="title2">Los Jueguitos de sam</h2>
                        {loading ? "Cargando..." : <ListGames games={filteredGames.length >= 1 ? filteredGames : games} page={page} changePage={extractData} api />}
                    </div>
                }
            </div>
        </div >
    )
}


const mapStateToProps = (state) => ({
    state,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
