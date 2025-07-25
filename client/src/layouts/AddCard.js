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
  } = authContext;

  return (
    <>
      {!user?.isAdmin ? (
        <div className='pageWrapper d-lg-flex justify-content-center mx-5 w-100'>
          <asid className='sidebarArea shadow mx-5' id='sidebarArea'>
            <Sidebar />
          </asid>

          <div className='w-100'>
            {/* <Container f> */}
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
            {/* </Container> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddCard;
