import React, { useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { Col, Row, Alert, InputGroup, Input, Button, Form } from 'reactstrap';
import { useParams } from 'react-router-dom';
import UserCard from '../components/dashboard/UserCard';
import Message from '../layouts/Message';

import Sidebar from '../layouts/Sidebar';

const UserProfile = (props) => {
  const { id } = useParams();

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, alerts } = alertContext;

  const {
    loadUser,
    error,
    data,
    clearErrors,
    users,
    user,
    isAuthenticated,
    depositsMoney,
  } = authContext;
  const [deposits, setDeposits] = useState({});

  const profile = users?.filter((user) => user._id === id);
  const userProfile = profile?.length > 0 ? profile[0] : [];

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    loadUser(userProfile._id);
  }, [isAuthenticated, props.history, error, data, userProfile._id]);

  const onChange = (e, cardNumber) => {
    const value = e.target.value;
    setDeposits((prev) => ({
      ...prev,
      [cardNumber]: value,
    }));
  };
  const onSubmit = async (e, cardNumber) => {
    e.preventDefault();
    const recipientId = userProfile._id;
    const recipientCardNumber = cardNumber;
    const depositFunds = deposits[cardNumber];

    if (depositFunds === 0) {
      setAlert('Please fill in all fields', 'danger');
    } else {
      const res = await depositsMoney({
        recipientId,
        depositFunds,
        recipientCardNumber,
      });

      if (res === 'done') {
        setAlert(data?.message, 'success');
        setDeposits({});
      }
    }
  };

  return (
    <main className='d-flex justify-content-center align-items-center flex-column'>
      <div style={{ maxWidth: '40%', minHeight: '5rem' }}>
        {alerts[0]?.msg && (
          <Message color={`${alerts[0]?.type}`}>{alerts[0]?.msg}</Message>
        )}
      </div>
      <div className='pageWrapper d-lg-flex mx-5 text-center'>
        <Sidebar />
        <div className='text-center'>
          {userProfile?.cards?.length > 0 ? (
            <h3 className='mb-4'>{userProfile.name} Cards</h3>
          ) : (
            <Alert color='primary' className='text-center'>
              {userProfile.name} has No Cards
            </Alert>
          )}

          {/*** Cards***/}
          <div className='contentArea'>
            <Row>
              <div className='d-flex  m-3'>
                {userProfile.cards?.map((card, index) => {
                  return (
                    <div className='d-flex flex-column m-3'>
                      <Col sm='6' lg='3'>
                        <UserCard userCard={card} userName={userProfile.name} />
                      </Col>
                      <h5 className='m-2'>The balance: ${card.balance}</h5>
                      <div className='mt-2' style={{ maxWidth: '100%' }}>
                        <Form onSubmit={(e) => onSubmit(e, card.cardNumber)}>
                          <InputGroup>
                            <Input
                              id='exampleAmount'
                              name='depositFunds'
                              required
                              onChange={(e) => onChange(e, card.cardNumber)}
                              value={deposits[card.cardNumber] || ''}
                              placeholder='Deposit Money'
                              type='number'
                            />
                            <Button color='success'>Send</Button>
                          </InputGroup>
                        </Form>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
