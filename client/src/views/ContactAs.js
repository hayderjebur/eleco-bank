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
const ContactUs = () => {
  return (
    <Row className='container d-flex justify-content-center'>
      <Col sm='12' lg='6'>
        <Card>
          <CardBody className='p-4'>
            <p>
              For any inquiries regarding your account, card services, or
              security features, please contact us using the details below: Bank
              Name: Eleco Bank (Prototype)
              <strong>Customer Service:</strong> +964 (0) ****
              <strong>Email:</strong>
              support@elecobank.com
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ContactUs;
