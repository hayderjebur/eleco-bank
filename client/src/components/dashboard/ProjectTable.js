import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import user1 from '../../assets/images/users/user1.jpg';
import user2 from '../../assets/images/users/user2.jpg';
import user3 from '../../assets/images/users/user3.jpg';
import user4 from '../../assets/images/users/user4.jpg';
import user5 from '../../assets/images/users/user5.jpg';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const imgs = [user1, user2, user3, user4, user5];

const ProjectTables = () => {
  const authContext = useContext(AuthContext);
  const { users } = authContext;
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>List of Clients</CardTitle>

          <Table className='no-wrap mt-3 align-middle' responsive borderless>
            <thead>
              <tr>
                <th>Clients</th>
                <th>Number of Cards</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className='border-top'>
                  <td>
                    <div className='d-flex align-items-center p-2'>
                      <img
                        src={imgs[index] || imgs[0]}
                        className='rounded-circle'
                        alt='avatar'
                        width='45'
                        height='45'
                      />
                      <Link
                        className='text-primary nav-link'
                        to={`/userProfile/${user._id}`}
                      >
                        <div className='ms-3'>
                          <h6 className='mb-0'>{user.name}</h6>
                          <span className='text-muted'>{user.email}</span>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td>{user.cards.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
