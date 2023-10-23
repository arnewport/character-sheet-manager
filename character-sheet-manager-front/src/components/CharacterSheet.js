import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import useSheets from '../hooks/useSheets';
import handleDelete from '../helpers/DeleteHelpers';
import { handleFindRecipient, handleShare } from '../helpers/ShareHelpers';
import { refreshSheet } from '../helpers/RefreshHelpers';

function CharacterSheet() {

  // parameters
  const { id } = useParams();

  // state
  const [sheet, setSheet, loading] = useSheets(id);
  const [recipientName, setRecipientName] = useState("");
  const [recipientId, setRecipientId] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // navigation
  const navigate = useNavigate();
    

  // Modal opening & closing functions
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

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
              }, [id, setSheet]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSheet({
          ...sheet,
          [name]: value,
        });
      };
      
      const handleChangeRecipientName = (e) => {
        const { value } = e.target;
        setRecipientName(value);
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

      
    
      if (loading) {
        return null;
      } 

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
                    value={sheet ? sheet.playerName : ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="curHitPoints">
                  <Form.Label>Current Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="curHitPoints"
                    value={sheet ? sheet.curHitPoints : 0}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="armorClass">
                  <Form.Label>Armor Class</Form.Label>
                  <Form.Control
                    type="number"
                    name="armorClass"
                    value={sheet ? sheet.armorClass : 0}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="thac0">
                  <Form.Label>THAC0</Form.Label>
                  <Form.Control
                    type="number"
                    name="thac0"
                    value={sheet ? sheet.thac0 : 0}
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
                        value={sheet ? sheet.characterName : ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="maxHitPoints">
                  <Form.Label>Maximum Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxHitPoints"
                    value={sheet ? sheet.maxHitPoints : 0}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="savingThrow">
                  <Form.Label>Saving Throw</Form.Label>
                  <Form.Control
                    type="number"
                    name="savingThrow"
                    value={sheet ? sheet.savingThrow : 0}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="attackBonus">
                  <Form.Label>Attack Bonus</Form.Label>
                  <Form.Control
                    type="number"
                    name="attackBonus"
                    value={sheet ? sheet.attackBonus : 0}
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
            <Button onClick={handleShareClick}>
              Share
            </Button>
            <Button onClick={() => {refreshSheet(id, setSheet)}}>
              Refresh
            </Button>
            <Button onClick={handleDeleteClick}>
              Delete
            </Button>
          </Form>

          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this sheet?</Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger me-2" variant="primary" onClick={() => {handleDelete(id, navigate)}}>
                  Delete
              </Button>
              <Button className="btn btn-warning" variant="secondary" onClick={handleCloseDeleteModal}>
                  Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showShareModal} onHide={handleCloseShareModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Share</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => {handleFindRecipient(e, recipientName, id, setRecipientId)}}>
                <Form.Group controlId="recipientName">
                  <Form.Label>Enter the username of the recipient</Form.Label>
                  <Form.Control
                    type="text"
                    name="recipientName"
                    value={recipientName ? recipientName : ""}
                    onChange={handleChangeRecipientName}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger me-2" variant="primary" onClick={(e) => {handleShare(e, recipientId, id, setErrors)}}>
                  Share
              </Button>
              <Button className="btn btn-warning" variant="secondary" onClick={handleCloseShareModal}>
                  Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    };

export default CharacterSheet;