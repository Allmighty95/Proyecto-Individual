
const initialState = {
  games: [],
  foundGames: [],
  createdGames: [],
  genres: [],
  filteredGames: [],
  loading: false,
  loadingSearch: false,
  loadinGameById: false,
  gameDetail: {},
  isCreated: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_GAMES':
      return {
        ...state,
        loading: true
      }
    case 'GET_SEARCH_GAMES':
      return {
        ...state,
        loadingSearch: true
      }
    case 'RECEIVE_GAMES':
      return {
        ...state,
        loading: false,
        games: action.games
      }
    case 'RECEIVE_FOUND_GAMES':
      return {
        ...state,
        loadingSearch: false,
        foundGames: action.games
      }
    case 'RECEIVE_GENRES':
      return {
        ...state,
        genres: action.genres
      }
    case 'GET_CREATED_GAMES':
      return {
        ...state,
        loadingSearch: true
      }
    case 'RECEIVE_CREATED_GAMES':
      return {
        ...state,
        loadingSearch: false,
        createdGames: action.games
      }
    case 'LOADING_GAME_BY_ID':
      return {
        ...state,
        loadinGameById: true
      }
    case 'RECEIVE_GAME_BY_ID':
      return {
        ...state,
        loadinGameById: false,
        gameDetail: action.game
      }
    case 'RECEIVE_FILTERED':
      return {
        ...state,
        filteredGames: action.games
      }
    case 'VIDEOGAME_CREATED':
      return {
        ...state,
        isCreated: true
      }
    default:
      return { ...state }
  }
}

export default reducer;