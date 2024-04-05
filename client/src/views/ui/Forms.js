import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

const Forms = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
            <i className='bi bi-bell me-2'> </i>
            Login
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for='exampleEmail'>Email</Label>
                <Input
                  id='exampleEmail'
                  name='email'
                  placeholder='with a placeholder'
                  type='email'
                />
              </FormGroup>
              <FormGroup>
                <Label for='examplePassword'>Password</Label>
                <Input
                  id='examplePassword'
                  name='password'
                  placeholder='password placeholder'
                  type='password'
                />
              </FormGroup>
              <Button className='mt-2'>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
