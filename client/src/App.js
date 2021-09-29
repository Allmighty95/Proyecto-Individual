import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Link, Route, Switch, useLocation
} from "react-router-dom";
import CreateGame from './Pages/CreateGame';
import Detail from './Pages/Detail';
import Home from './Pages/Home';
import store from './redux/store/store';

//https://reactrouter.com/web/example/query-parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <RoutesWithQuery />
      </Router>
    </Provider>
  )
}

function RoutesWithQuery() {
  const query = useQuery();

  return (
    <div id="app">
      
      <div id="routes">
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/create">
            <CreateGame />
          </Route>

          <Route exact path="/detail">
            <Detail id={query.get('id')} api={query.get('api')}/>
          </Route>

        </Switch>
      </div>

      <nav >
        <ul id="navUl">
          <li>
            <Link id="brand" to="/">Los Juegos de Sam</Link>
          </li>

          <li>
            <Link className="link" to="/">Tienda</Link>
          </li>

          <li>
            <Link className="link" to="/create">Soy un creador</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
