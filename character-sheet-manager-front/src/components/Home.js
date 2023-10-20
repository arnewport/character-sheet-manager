import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from 'react-bootstrap';
import useUserSheets from "../hooks/useUserSheets";
import { logout } from "../services/authAPI";

function Home() {

  const [userSheetArray, loading] = useUserSheets();

    const generateCards = () => {

      return userSheetArray.map((usa, i) => 
        (
          <Col key={i} lg={4} md={6} sm={12}>
            <Link to={`/sheets`}>
              <Card>
                <Card.Body>
                  <Card.Title>Card {usa.sheetId}</Card.Title>
                  <Card.Text>Card description here.</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ));
    }

  if (loading) {
    return null;
  }  

    return (
        <>
            <div className="container-fluid">
                <h1 className="display-5">Character Sheet Manager</h1>
                <div className="d-flex flex-grow-1 justify-content-end">
                    <Link to="/" className="btn btn-info" onClick={logout}>Log Out</Link>
                </div>
                <Row>
                    {generateCards()}
                </Row>
            </div>
        </>
    );
}

export default Home;