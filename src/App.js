import { Col, Row } from 'antd';

import Tracker from './Tracker';
import './styles.scss';

function App() {
  return (
    <div id="wrapper">
      <div id="header-wrapper"/>
      <div id="content-wrapper">
        <div className="container">
          <Row>
            <Col span={24}>
              <Tracker name="Bitcoin" id="bitcoin"/>
              <Tracker name="Ether" id="ethereum"/>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App;
