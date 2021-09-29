export function getGamesAll() {
    return {
        type: 'GET_ALL_GAMES',
    }
}

export function getGamesSearch() {
    return {
        type: 'GET_SEARCH_GAMES',
    }
}

export function getCreatedGames() {
    return {
        type: 'GET_CREATED_GAMES',
    }
}

export function receiveGames(games) {
    return {
        type: 'RECEIVE_GAMES',
        games
    }
}

export function receiveFoundGames(games) {
    return {
        type: 'RECEIVE_FOUND_GAMES',
        games
    }
}

export function receiveCreatedGames(games) {
    return {
        type: 'RECEIVE_CREATED_GAMES',
        games
    }
}

export function receiveGenres(genres) {
    return {
        type: 'RECEIVE_GENRES',
        genres
    }
}

export function loadingGameById() {
    return {
        type: 'LOADING_GAME_BY_ID',
    }
}

export function receiveGameById(game) {
    return {
        type: 'RECEIVE_GAME_BY_ID',
        game
    }
}

export function filteredGames(games) {
    return {
        type: 'RECEIVE_FILTERED',
        games
    }
}

export function gameCreated() {
    return {
        type: 'VIDEOGAME_CREATED',
    }
}

export function filterGames({ games, filter, payload, }) {
    return function (dispatch) {
        let newFilteredGames
        switch (filter) {
            case 'genre':
                newFilteredGames = payload != "Seleccionar un genero" ?
                    games.filter(game => game.genres.some(genre => genre.name == payload))
                    : games
                if (newFilteredGames.length < 1) {
                    alert('No se encontraron resultados para ese filtro')
                }
                dispatch(filteredGames(newFilteredGames))
                break;
            case 'name':
                if (payload == true) {
                    newFilteredGames =
                        games.sort(function (a, b) {
                            if (a.name < b.name) { return - 1; }
                            if (a.name > b.name) { return 1; }
                            return 0;
                        })
                    dispatch(filteredGames(newFilteredGames))
                }
                else {
                    newFilteredGames =
                        games.sort(function (a, b) {
                            if (a.name > b.name) { return -1; }
                            if (a.name < b.name) { return 1; }
                            return 0;
                        })
                    dispatch(filteredGames(newFilteredGames))
                }
            case 'rating':
                newFilteredGames =
                    games.slice()
                        .sort((a, b) => payload == true ?
                            a.rating + b.rating
                            : a.rating - b.rating
                        )
                dispatch(filteredGames(newFilteredGames))
            default:
                break;
        }
    }
}
export function fetchGames(page) {
    return function (dispatch) {
        dispatch(getGamesAll())
        const api = "https://api.rawg.io/api/games?key=520f36d4cfda4a18ab3c7c395626e885&page=" + page
        fetch(api)
            .then(async res => {
                const respuestaEnJson = await res.json()
                dispatch(receiveGames(respuestaEnJson.results))
            })
            .catch(e => console.log(e));
    }
}


export function fetchGamesByName(name) {
    return function (dispatch) {
        dispatch(getGamesSearch())
        let allResults = []
        //Api local
        const localApi = "http://localhost:3001/videogames?name=" + name
        fetch(localApi)
            .then(async res => {
                const respuestaEnJson = await res.json()
                allResults = allResults.concat(respuestaEnJson.results)

            })
            .catch(e => console.log(e));
        // Api rawg
        const api = "https://api.rawg.io/api/games?key=520f36d4cfda4a18ab3c7c395626e885&search=" + name
        fetch(api)
            .then(async res => {
                const respuestaEnJson = await res.json()
                allResults = allResults.concat(respuestaEnJson.results)
                dispatch(receiveFoundGames(allResults))
            })
            .catch(e => console.log(e));

    }
}

export function fetchGenres() {
    return function (dispatch) {
        const api = "https://api.rawg.io/api/genres?key=520f36d4cfda4a18ab3c7c395626e885"
        fetch(api)
            .then(async res => {
                const respuestaEnJson = await res.json()
                dispatch(receiveGenres(respuestaEnJson.results))
            })
            .catch(e => console.log(e));
    }
}

export function fetchCreatedGames() {
    return function (dispatch) {
        dispatch(getGamesSearch())
        const api = "http://localhost:3001/videogames"
        fetch(api)
            .then(async res => {
                const respuestaEnJson = await res.json()
                dispatch(receiveCreatedGames(respuestaEnJson.results))
            })
            .catch(e => console.log(e));
    }
}

export function fetchGameById(id, api) {
    return function (dispatch) {
        dispatch(loadingGameById())
        if (api == "true") {
            const api = "https://api.rawg.io/api/games/" + id + "?key=520f36d4cfda4a18ab3c7c395626e885"
            fetch(api)
                .then(async res => {
                    const respuestaEnJson = await res.json()
                    dispatch(receiveGameById(respuestaEnJson))
                })
                .catch(e => console.log(e));
        } else {
            const api = "http://localhost:3001/videogames/" + id
            fetch(api)
                .then(async res => {
                    const respuestaEnJson = await res.json()
                    dispatch(receiveGameById(respuestaEnJson.data))
                })
                .catch(e => console.log(e));
        }
    }
}

export function createGame(data) {
    return function (dispatch) {
        dispatch(loadingGameById())
        fetch('http://localhost:3001/videogame', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async res => {

            if (res.status != 200) {
                alert('Fallo al crear el juego, verifique los datos')
            }
            else {
                let jsonReposponse = await res.json()
                console.log("res", jsonReposponse);
                dispatch(gameCreated())
                alert('Videojuego creado satisfactoriamente')
            }
        }).catch(err => {
            alert('Fallo al crear el juego, verifique los datos')
            console.log("err", err);
        })
    }
}