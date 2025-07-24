import React, { useContext } from 'react';
import { Table } from 'reactstrap';
import Sidebar from '../layouts/Sidebar';
// import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const TransationHistory = () => {
  //   const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  //   const { setAlert, alerts } = alertContext;

  const { transfarFunds, isLoading, user } = authContext;
  console.log(user);
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
            <tr className='table-success'>
              {user?.transations?.map((trans, index) => (
                <>
                  <th scope='row'>{1 + index}</th>
                  <td>{trans.senderCardNumber}</td>
                  <td>{trans.recipientCardNumber}</td>
                  <td>{trans.amount}</td>
                  <td>{trans.createdAt.split('T')[0]}</td>
                </>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default TransationHistory;
