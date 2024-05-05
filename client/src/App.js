// import { useRoutes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Themeroutes from './routes/Router';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CardState from './context/card/CardState';
import PrivateRoute from './routes/PrivateRoute';
import FullLayout from './layouts/FullLayout';
import Register from './views/Register';
import Login from './views/Login';
import Starter from './views/Starter';
import UserProfile from './views/UserProfile';

const App = () => {
  // const routing = useRoutes(Themeroutes);

  return (
    <AuthState>
      <CardState>
        <AlertState>
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={FullLayout} />
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
