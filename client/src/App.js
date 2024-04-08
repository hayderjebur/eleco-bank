import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <AuthState>
      <AlertState>{routing}</AlertState>
    </AuthState>
  );
};

export default App;
