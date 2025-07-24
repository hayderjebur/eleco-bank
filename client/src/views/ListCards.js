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
  // console.log('authContext', authContext);

  const { setAlert, alerts } = alertContext;
  const { user } = authContext;
  // console.log('user:', user);

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

        <div className='mx-4'>
          {!user?.isAdmin && (
            <Row>
              <p>Email: {user?.email}</p>
              <p>Number of Cards: {user?.cards?.length}</p>
              {user?.cards?.length > 0 ? (
                <h3 className='text-center mb-3'>Your Cards</h3>
              ) : (
                <h3 className='text-center mb-3'>You Do not Have Any Cards</h3>
              )}
              {user?.cards?.map((card) => {
                return (
                  <Col sm='6' lg='6' key={card._id} className='text-center'>
                    <UserCard userCard={card} userName={user.name} />
                    <h5 className='m-2'>The balance: ${card.balance}</h5>
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
