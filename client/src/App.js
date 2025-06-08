// import { useRoutes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Themeroutes from './routes/Router';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CardState from './context/card/CardState';
import PrivateRoute from './routes/PrivateRoute';
// import FullLayout from './layouts/FullLayout';
import Register from './views/Register';
import Login from './views/Login';

import UserProfile from './views/UserProfile';
import Header from './layouts/Header';
import HeaderV2 from './layouts/HeaderV2';
import AddCard from './layouts/AddCard';
import ListCards from './views/ListCards';

const App = () => {
  return (
    <AuthState>
      <CardState>
        <AlertState>
          <Router>
            <HeaderV2 />
            {/* <Header /> */}
            <Switch>
              <PrivateRoute exact path='/' component={ListCards} />
              <PrivateRoute exact path='/add-card' component={AddCard} />
              <PrivateRoute
                exact
                path='/userProfile/:id'
                component={UserProfile}
              />

              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Router>
        </AlertState>
      </CardState>
    </AuthState>
  );
};

export default App;
