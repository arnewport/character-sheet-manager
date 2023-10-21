import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
// import useSheet from '../hooks/useSheet';

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

function CharacterSheet() {

    const [sheet, setSheet] = useState(INITIAL_SHEET);
    const [errors, setErrors] = useState([]);
    const { id } = useParams();

    // DELETION

    const handleDeleteClick = (agentId) => {
      setId(agentId);
      setShowModal(true);
  };
  
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // okay, since I'm making the deletion at the sheet
    // I need to pass on the user id to here as well
    // we'll need to pull the UserSheet and check if the user is OWNER
    // if owner, we delete the UserSheet and the sheet; navigate back to home
    // if editor, we delete the UserSheet but not the sheet; we just navigate back to home afterwards

    const handleDelete = () => {
      if (id !== null) {
          const config = {
              method: "DELETE",
          };
          fetch("http://localhost:8080/api/v1/sheet/" + id, config)
              .then(response => {
                  if (response.ok) {
                      // success
                      // delete all associated instances here
                  } else {
                      // failure
                      return Promise.reject(
                          new Error(`Unexpected status code ${response.status}`)
                      );
                  }
              }).then(setId)
              .catch(error => {
                  console.error(error);
              });  
      }
      handleCloseModal();
      return;
  }

  //

    useEffect(() => {
      if (id) {
        fetch("http://localhost:8080/api/v1/sheet/" + id)
          .then(response => {
                     if (response.ok) {
                      return response.json();
                     }  else {
                      return Promise.reject(
                          new Error(`Unexpected status code ${response.status}`)
                      );
                     }
                  })
          .then(setSheet).catch(
                      error => {
                          console.error(error);
                      });
                  }
              }, [id]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSheet({
          ...sheet,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here
        const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheet),
        };
        fetch("http://localhost:8080/api/v1/sheet/" + id, config)
          .then(response => {
            if (response.ok) {
              // navigate("/agents");
            } else if (response.status === 400) {
              return response.json();
            }
          })
          .then(errors => {
                      if (errors) {
                          return Promise.reject(errors);
                      }
                  })
                  .catch(errors => {
                      if (errors.length) {
                          setErrors(errors);
                      } else {
                          setErrors([errors]);
                      }
                  });
      };
    
      return (
        <Container>
          <h1>Character Sheet</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="playerName">
                  <Form.Label>Player Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="playerName"
                    value={sheet.playerName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="curHitPoints">
                  <Form.Label>Current Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="curHitPoints"
                    value={sheet.curHitPoints}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="armorClass">
                  <Form.Label>Armor Class</Form.Label>
                  <Form.Control
                    type="number"
                    name="armorClass"
                    value={sheet.armorClass}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="thac0">
                  <Form.Label>THAC0</Form.Label>
                  <Form.Control
                    type="number"
                    name="thac0"
                    value={sheet.thac0}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="characterName">
                    <Form.Label>Character Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="characterName"
                        value={sheet.characterName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="maxHitPoints">
                  <Form.Label>Maximum Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxHitPoints"
                    value={sheet.maxHitPoints}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="savingThrow">
                  <Form.Label>Saving Throw</Form.Label>
                  <Form.Control
                    type="number"
                    name="savingThrow"
                    value={sheet.savingThrow}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="attackBonus">
                  <Form.Label>Attack Bonus</Form.Label>
                  <Form.Control
                    type="number"
                    name="attackBonus"
                    value={sheet.attackBonus}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Link to="/home" className="btn btn-warning">
              Home
            </Link>
            <Button>
              Share
            </Button>
            <Button>
              Refresh
            </Button>
            <Button onClick={() => handleDeleteClick(id)}>
              Delete
            </Button>
          </Form>
          <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this sheet?</Modal.Body>
                <Modal.Footer>
                <Button className="btn btn-danger me-2" variant="primary" onClick={handleDelete}>
                    Delete
                </Button>
                <Button className="btn btn-warning" variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
      );
    };

export default CharacterSheet;