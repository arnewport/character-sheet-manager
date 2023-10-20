import { Link } from "react-router-dom";
import { Card, Col, Row } from 'react-bootstrap';

function Home() {

    const generateCards = () => {
        const count = 6;
        const cards = [];
    
        for (let i = 1; i <= count; i++) {
          const card = (
            <Col key={i} lg={4} md={6} sm={12}>
              <Link to={`/sheets`}>
                <Card>
                  <Card.Body>
                    <Card.Title>Card {i}</Card.Title>
                    <Card.Text>Card description here.</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
    
          cards.push(card);
        }
    
        return cards;
    }

    return (
        <>
            <div className="container-fluid">
                <h1 className="display-5">Character Sheet Manager</h1>
                <div className="d-flex flex-grow-1 justify-content-end">
                    <Link id="btnAdd" to="/" className="btn btn-info">Log Out</Link>
                </div>
                <Row>
                    {generateCards()}
                </Row>
            </div>
        </>
    );
}

export default Home;