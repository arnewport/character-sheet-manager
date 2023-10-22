import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row } from 'react-bootstrap';
import useUserSheets from "../hooks/useUserSheets";
import { logout } from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

function Home() {

  const [userSheetArray, loading] = useUserSheets();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const userId = user.userId;

    const generateCards = () => {

      const cards = userSheetArray.map((usa, i) => 
        (
          <Col key={i} lg={4} md={6} sm={12}>
            <Link to={`/sheet/${usa.sheetId}`}>
              <Card>
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
              <Card onClick={createNewSheet}>
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

    const INITIAL_SHEET = {
      playerName: '',
      characterName: '',
      curHitPoints: 0,
      maxHitPoints: 0,
      armorClass: 0,
      savingThrow: 0,
      thac0: 0,
      attackBonus: 0
}

    const createNewSheet = async () => {
      // POST
      const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(INITIAL_SHEET)
    }

    fetch("http://localhost:8080/api/v1/sheet", config)
        .then(response => {
            if (response.ok) {
                return response.json().then(data => createNewUserSheet(data));
            } else {
                return response.json();
            }
        })
        .then(errs => {
            if (errs) {
                return Promise.reject(errs);
            }
        })
        .catch(errs => {
            if (errs.length) {
                setErrors(errs);
            } else {
                setErrors([errs]);
            }
        });
    }

    const createNewUserSheet = async (data) => {

      // POST
      const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userId": userId,
          "sheetId": data.id,
          "role": "OWNER",
          "status": "NONE"
        })
    }

    fetch("http://localhost:8080/api/v1/userSheet", config)
        .then(response => {
            if (response.ok) {
                navigate(`/sheet/${data.id}`);
            } else {
                return response.json();
            }
        })
        .then(errs => {
            if (errs) {
                return Promise.reject(errs);
            }
        })
        .catch(errs => {
            if (errs.length) {
                setErrors(errs);
            } else {
                setErrors([errs]);
            }
        });
    }

    // we need to...
    // create a new blank sheet
    // get the id from the new blank sheet
    // use the sheet id and user id to construct userSheet
    // create a userSheet entry

    // but we don't know the id of the sheet until after we create it
    // we could try to grab the id of the most recent sheet, but this creates a race condition

    // there may be a better way, but
    // put a unique identifier into the sheet (current time + userId)
    // fetch the sheet by the unique idenitfier
    // grab the sheet's id
    // proceed from there

    // we could make a transactional operation
    // add sheet, retrieve sheet id, add userSheet

    // we could create a sheet when the card is clicked in the home screen
    // or, we could not bother to create a card until "Save" is clicked in the card screen
    // I like the second one more, but it sounds more involved

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