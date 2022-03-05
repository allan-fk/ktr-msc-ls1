import { Row, Col } from 'antd';

const ListCards = (props) => {
  const {cards} = props
  console.log(cards)
  return (
    <Row>
      <Col spam={12}>
        <h1>List cards</h1>
        {cards.map(card => 
          card.name && (
            <div>
              <h3 key={card.name}>name: {card.name}</h3>
              <p key={card.company}>company: {card.company}</p>
              <p key={card.mail}>email: {card.mail}</p>
              <p key={card.phone}>phone {card.phone}</p>
            </div>
          )
        )}
      </Col>
    </Row>

  );
};

export default ListCards;
