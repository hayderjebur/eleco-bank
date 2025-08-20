// import { useRoutes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Themeroutes from './routes/Router';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
// import CardState from './context/card/CardState';
import PrivateRoute from './routes/PrivateRoute';
// import FullLayout from './layouts/FullLayout';
import Register from './views/Register';
import Login from './views/Login';

import UserProfile from './views/UserProfile';
import Header from './layouts/Header';
import HeaderV2 from './layouts/HeaderV2';
import AddCard from './layouts/AddCard';
import ListCards from './views/ListCards';
import TransfarFundsForm from './components/dashboard/TransfarFundsForm';
import TransationHistory from './views/TransationHistory';
import About from './views/About';
import ContactUs from './views/ContactAs';
import Branches from './views/Branches';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <HeaderV2 />
          {/* <Header /> */}
          <Switch>
            <PrivateRoute exact path='/' component={ListCards} />
            <PrivateRoute exact path='/add-card' component={AddCard} />
            <PrivateRoute
              exact
              path='/transfar-funds'
              component={TransfarFundsForm}
            />
            <PrivateRoute
              exact
              path='/transation-history'
              component={TransationHistory}
            />
            <PrivateRoute
              exact
              path='/userProfile/:id'
              component={UserProfile}
            />

            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/about' component={About} />
            <Route exact path='/branches' component={Branches} />
            <Route exact path='/contact-us' component={ContactUs} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
