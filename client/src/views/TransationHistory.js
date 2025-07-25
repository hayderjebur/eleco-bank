import React, { useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../layouts/Sidebar';
import AuthContext from '../context/auth/authContext';

const TransationHistory = () => {
  const authContext = useContext(AuthContext);
  const { user, data, loadUser, userId } = authContext;

  useEffect(() => {
    loadUser(userId);
  }, [data]);
  return (
    <div className='pageWrapper d-lg-flex justify-content-center mx-5 w-100'>
      <asid className='sidebarArea shadow mx-5' id='sidebarArea'>
        <Sidebar />
      </asid>
      <div className='w-100'>
        <Table>
          <thead>
            <tr className='table-info'>
              <th>#</th>
              <th>Sent from Card Number</th>
              <th>Recipient Card Number</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {user?.transations?.map((trans, index) => (
              <tr className='table-success'>
                <th scope='row'>{1 + index}</th>
                <td>{trans.senderCardNumber}</td>
                <td>{trans.recipientCardNumber}</td>
                <td>${trans.amount}</td>
                <td>{trans.createdAt.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default TransationHistory;
