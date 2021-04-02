import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';

const data = {
  bitcoin: {
    amount: 0.1,
    price: 6150000
  },
  ethereum: {
    amount: 1.12,
    price: 180000
  }
};

const Tracker = ({ name, id }) => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState(null);

  const get = async () => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then((response) => {
        setCoin(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log(`Error occurred trying to load ${id}`);
      })
  };

  useEffect(() => {
    get();
  }, []);

  const gain = () => {
    const coindata = data[id];
    const oldInvestment = coindata.amount * coindata.price;
    const now = coindata.amount * coin.market_data.current_price.jpy;
    return [
      ((now - oldInvestment) / oldInvestment * 100).toFixed(2),
      (now - oldInvestment).toFixed(2)
    ];
  };

  return (
    <div className="tracker">
      <Card
        title={(
          <div className="title-bar">
            <span>{name}</span>
            <span className="action" onClick={get}>
              {
                loading
                  ? <LoadingOutlined style={{ color: '#33d9b2' }}/>
                  : <ReloadOutlined style={{ color: '#33d9b2' }}/>
              }
            </span>
          </div>
        )}
        bordered={false}
      >
        <Skeleton loading={loading} active={true}>
          {
            !loading && (
              <>
                <Row gutter={18}>
                  <Col span={7}>
                    <Statistic title="USD" value={coin.market_data.current_price.usd}/>
                  </Col>
                  <Col span={7}>
                    <Statistic title="JPY" value={coin.market_data.current_price.jpy}/>
                  </Col>
                </Row>
                <Row gutter={18}>
                  <Col span={7}>
                    <Statistic title="Gain" value={gain()[1]}/>
                  </Col>
                  <Col span={7}>
                    <Statistic title="Gain %" value={gain()[0]}/>
                  </Col>
                </Row>
              </>
            )
          }
        </Skeleton>
      </Card>
    </div>
  );
};

export default Tracker;
