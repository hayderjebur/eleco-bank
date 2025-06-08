import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row } from 'reactstrap';
import UsersTables from '../components/dashboard/UsersTable';
import UserCard from '../components/dashboard/UserCard';
import PaymentForm from '../components/dashboard/PaymentForm';
import AlertContext from '../context/alert/alertContext';
import Sidebar from '../layouts/Sidebar';

const ListCards = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  console.log('authContext', authContext);

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

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     props.history.push('/login');
  //   }
  // }, [isAuthenticated, props.history]);

  return (
    <>
      <div
        className={`pageWrapper d-lg-flex mx-5 ${
          user?.isAdmin ? 'justify-content-center' : ''
        }`}
      >
        {!user?.isAdmin ? (
          <aside className='sidebarArea shadow' id='sidebarArea'>
            <Sidebar />
          </aside>
        ) : null}

        <div style={{ width: '59%' }} className='mx-4'>
          {!user?.isAdmin && (
            <Row>
              {user?.cards?.length > 0 ? (
                <h3 className='text-center mb-3'>Your Cards</h3>
              ) : (
                <h3 className='text-center mb-3'>You Do not Have Any Cards</h3>
              )}
              {user?.cards?.map((card) => {
                return (
                  <Col sm='6' lg='6' key={card._id}>
                    <UserCard userCard={card} userName={user.name} />
                  </Col>
                );
              })}
            </Row>
          )}
          {user?.isAdmin ? (
            <Row>
              <Col lg='12'>
                <UsersTables />
              </Col>
            </Row>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ListCards;
