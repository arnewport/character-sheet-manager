import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import useSheets from '../hooks/useSheets';

function CharacterSheet() {

    const { id } = useParams();

    const [sheet, setSheet, loading] = useSheets(id);
    const [username, setUsername] = useState([{ name: '' }]);
    const [recipientId, setRecipientId] = useState([0]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    

    // DELETION

    const handleDeleteClick = () => {
      setShowDeleteModal(true);
  };
  
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
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

          const deleteAllUserSheets = async () => {

            fetch("http://localhost:8080/api/v1/userSheet/deleteAll/" + id, config)
              .then(response => {
                  if (response.ok) {
                      // success
                      deleteSheet();
                  } else {
                      // failure
                      return Promise.reject(
                          new Error(`Unexpected status code ${response.status}`)
                      );
                  }
              }).catch(error => {
                  console.error(error);
              });

          }


          const deleteSheet = async () => {

            fetch("http://localhost:8080/api/v1/sheet/" + id, config)
              .then(response => {
                  if (response.ok) {
                      // success
                      navigate("/home");
                  } else {
                      // failure
                      return Promise.reject(
                          new Error(`Unexpected status code ${response.status}`)
                      );
                  }
              }).catch(error => {
                  console.error(error);
              });

          }

          deleteAllUserSheets();
            
      }
      handleCloseDeleteModal();
      return;
  }

  // SHARE

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
              }, [id]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSheet({
          ...sheet,
          [name]: value,
        });
      };

      const handleChangeUsername = (e) => {
        const { name, value } = e.target;
        setUsername((prevState) => ({
          ...prevState,
          [name]: value,
        }));
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

      // Resolved [org.springframework.security.core.userdetails.UsernameNotFoundException: undefined not found.]
      const handleFindRecipient = async (e) => {
        e.preventDefault();
        console.log("http://localhost:8080/api/v1/user/" + username.name)
        const response = await fetch("http://localhost:8080/api/v1/user/" + username.name);

        // I need a "not found" and a "searching error" error handling

        if (!response.ok) {
          throw new Error(`Failed to fetch username: ${response.status}`);
        }

        const data = await response.json();
        setRecipientId(data.id);
      }

      const handleShare = async (e) => {
        e.preventDefault();

        if (recipientId < 1) {
          console.log("The recipient has either not been selected or was not found.")
          console.log("Please enter a username and search for a user.")
          return;
        }

        const config = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "userId": recipientId,
            "sheetId": id,
            "role": "EDITOR",
            "status": "NONE"
          })
      }
  
      fetch("http://localhost:8080/api/v1/userSheet", config)
          .then(response => {
              if (response.ok) {
                console.log("Successful share!")
                  // navigate(`/sheet/${data.id}`);
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
            <Button>
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
              <Button className="btn btn-danger me-2" variant="primary" onClick={handleDelete}>
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
              <Form onSubmit={handleFindRecipient}>
                <Form.Group controlId="username">
                  <Form.Label>Enter the username of the recipient</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username ? username.name : ""}
                    onChange={handleChangeUsername}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger me-2" variant="primary" onClick={handleShare}>
                  Delete
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