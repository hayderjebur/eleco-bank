import { Col, Row } from 'reactstrap';
import ProjectTables from '../components/dashboard/ProjectTable';
import TopCards from '../components/dashboard/TopCards';
import PaymentForm from '../components/dashboard/PaymentForm';

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-success text-success'
            title='Profit'
            subtitle='Yearly Earning'
            earning='$21k'
            icon='bi bi-wallet'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-danger text-danger'
            title='Refunds'
            subtitle='Refund given'
            earning='$1k'
            icon='bi bi-coin'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-warning text-warning'
            title='New Project'
            subtitle='Yearly Project'
            earning='456'
            icon='bi bi-basket3'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-info text-into'
            title='Sales'
            subtitle='Weekly Sales'
            earning='210'
            icon='bi bi-bag'
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm='12' lg='12'>
          <PaymentForm />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg='12'>
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
