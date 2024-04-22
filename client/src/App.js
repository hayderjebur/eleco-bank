import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CardState from './context/card/CardState';

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <AuthState>
      <CardState>
        <AlertState>{routing}</AlertState>
      </CardState>
    </AuthState>
  );
};

export default App;
