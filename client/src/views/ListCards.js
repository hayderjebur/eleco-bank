import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row } from 'reactstrap';
import UsersTables from '../components/dashboard/UsersTable';
import UserCard from '../components/dashboard/UserCard';
import Sidebar from '../layouts/Sidebar';

const ListCards = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <>
      <div
        className={`pageWrapper d-lg-flex ${
          user?.isAdmin ? 'justify-content-center' : ''
        }`}
      >
        {!user?.isAdmin ? (
          // <aside className='sidebarArea shadow' id='sidebarArea'>
          <Sidebar />
        ) : // </aside>
        null}

        <div className='mx-4 w-100'>
          {!user?.isAdmin && (
            <Row>
              <div style={{ marginLeft: '6rem' }}>
                <p>Email: {user?.email}</p>
                <p>Number of Cards: {user?.cards?.length}</p>
              </div>
              {user?.cards?.length > 0 ? (
                <h3 className='text-center mb-3'>Your Cards</h3>
              ) : (
                <h3 className='text-center mb-3'>You Do not Have Any Cards</h3>
              )}
              {user?.cards?.map((card) => {
                return (
                  <Col sm='12' lg='6' key={card._id} className='text-center'>
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
