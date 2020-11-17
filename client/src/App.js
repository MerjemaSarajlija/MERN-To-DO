import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import {Provider }from 'react-redux';
import store from './store';
import KanbanBoard from './components/KanbanBoard';
import { loadUser } from './actions/authActions';
import { Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from './history';
import Home from './components/Home';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth.isAuthenticated);
   return (
      <Route {...rest} render={(props) => ( auth ? <Component {...props} /> : <Redirect to='/' /> )} />
  )
}

const App = () => {
  useEffect(() => {
      store.dispatch(loadUser())
    });
  
    return (
      <Provider store={store}>
      <Router history = {history}>
          <Route path="*" component={ AppNavbar } />
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/board" exact component={KanbanBoard}/>
       </Router>
     </Provider>
  );
}

export default App;
