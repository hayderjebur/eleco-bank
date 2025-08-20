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
const About = () => {
  return (
    <Row className='container d-flex justify-content-center'>
      <Col sm='12' lg='6'>
        <Card>
          <CardBody className='p-4'>
            <p>
              <strong>Secure Bank System</strong> is a prototype web platform
              developed solely for academic and research purposes. This platform
              was built as part of a Master’s thesis project in the Department
              of Computer Science at Al-Mustansiriyah University, Baghdad, Iraq.
              The main objective of this system is to demonstrate the practical
              application of advanced asymmetric encryption using elliptic curve
              cryptography (ECC), specifically Edwards and Koblitz curves,
              enhanced by chaotic systems such as the Logistic and Hénon maps.
              <h6>Developer: Tabarak Abdallah Kareem</h6>
              <h6>Supervisor: Assist. prof. Dr.Anwar Abbas Hattab</h6>{' '}
              University: Al-Mustansiriyah University, College of Education,
              Department of Computer Science, Baghdad, Iraq Year: 2025
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
