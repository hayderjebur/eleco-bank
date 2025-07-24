import Sidebar from './Sidebar';
import Header from './Header';
import { Container } from 'reactstrap';
import Starter from '../views/ListCards';
import PaymentForm from '../components/dashboard/PaymentForm';
import { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const AddCard = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  const {
    addCard,
    error,
    user,
    loadUser,
    userId,
    data,
    clearErrors,
    clearData,
    isAuthenticated,
  } = authContext;
  return (
    <>
      {!user?.isAdmin ? (
        <main>
          <div className='pageWrapper d-lg-flex mx-5 w-100'>
            <aside className='sidebarArea shadow' id='sidebarArea'>
              <Sidebar />
            </aside>

            <div className='contentArea'>
              <Container className=' wrapper' fluid>
                <PaymentForm
                  error={error}
                  setAlert={setAlert}
                  alerts={alerts}
                  addCard={addCard}
                  loadUser={loadUser}
                  userId={userId}
                  data={data}
                  clearErrors={clearErrors}
                  clearData={clearData}
                />
              </Container>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
};

export default AddCard;
