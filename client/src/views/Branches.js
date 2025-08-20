import React from 'react';
import {
  Row,
  Col,
  CardTitle,
  Button,
  CardSubtitle,
  Card,
  CardBody,
} from 'reactstrap';
const Branches = () => {
  return (
    <Row className='container d-flex justify-content-center'>
      <Col sm='12' lg='6'>
        <Card>
          <CardBody className='p-4'>
            <p>
              <h5>Baghdad – Al-Mansour Branch</h5> 📍 Al-Mansour Street, Near
              Al-Mansour Mall, Baghdad 📞 +964 77******** 🕒 Sunday–Thursday,
              9:00 AM – 3:00 PM 2.
            </p>
            <p>
              <h5>Basrah – Ashar Branch</h5> 📍 Corniche Street, Next to Basrah
              University, Ashar, Basrah 📞 +964 78******** 🕒 Sunday–Thursday,
              8:30 AM – 2:30 PM 3.
            </p>{' '}
            <p>
              <h5>Erbil – City Center Branch</h5> 📍 60 Meter Street, Near
              Family Mall, Erbil 📞 +964 75******** 🕒 Sunday–Thursday, 9:00 AM
              – 4:00 PM
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Branches;
