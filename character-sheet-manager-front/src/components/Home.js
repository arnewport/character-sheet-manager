import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from 'react-bootstrap';
import useUserSheets from "../hooks/useUserSheets";
import { logout } from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { createNewSheet, createNewUserSheet } from "../helpers/CreateHelpers";

function Home() {

  // state
  const [userSheetArray, setUserSheetArray, loading] = useUserSheets();
  const [errors, setErrors] = useState([]);

  // navigation
  const navigate = useNavigate();

  // context
  const { user } = useContext(AuthContext);
  const userId = user.userId;

  // row contents
  const generateCards = () => {

  const cards = userSheetArray.map((usa, i) => 
    (
      <Col key={i} lg={4} md={6} sm={12}>
        <Link to={`/sheet/${usa.sheetId}`}>
          <Card className="mb-5 mt-5 h-75">
            <Card.Body>
              <Card.Title>Card {usa.sheetId}</Card.Title>
              <Card.Text>Card description here.</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));

    cards.push(
      <Col key={cards.length} lg={4} md={6} sm={12}>
        <Link>
          <Card onClick={() => {createNewSheet(userId, navigate, setErrors)}} className="mb-5 mt-5 h-75">
            <Card.Body>
              <Card.Title>New Sheet</Card.Title>
              <Card.Text>Click to create a new sheet</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    )

  return cards;
}

  if (loading) {
    return null;
  }  

    return (
        <>
            <div className="container-fluid">
                <h1 className="display-5">Character Sheet Manager</h1>
                <div className="d-flex flex-grow-1 justify-content-end">
                  {/* <Button onClick={() => {setUserSheetArray([])}}>
                    Refresh
                  </Button> */}
                  <Link to="/" className="btn btn-info" onClick={logout}>
                    Log Out
                  </Link>
                </div>
                <Row>
                    {generateCards()}
                </Row>
            </div>
        </>
    );
}

export default Home;