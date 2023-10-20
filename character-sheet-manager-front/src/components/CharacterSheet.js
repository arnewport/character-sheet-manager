import { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CharacterSheet() {

    const [formData, setFormData] = useState({
        playerName: '',
        characterName: '',
        curHitPoints: 0,
        maxHitPoints: 0,
        armorClass: 0,
        savingThrow: 0,
        thac0: 0,
        attackBonus: 0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here
        console.log(formData);
      };
    
      return (
        <Container>
          <h1>Character Information</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="playerName">
                  <Form.Label>Player Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="curHitPoints">
                  <Form.Label>Current Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="curHitPoints"
                    value={formData.curHitPoints}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="armorClass">
                  <Form.Label>Armor Class</Form.Label>
                  <Form.Control
                    type="number"
                    name="armorClass"
                    value={formData.armorClass}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="thac0">
                  <Form.Label>THAC0</Form.Label>
                  <Form.Control
                    type="number"
                    name="thac0"
                    value={formData.thac0}
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
                        value={formData.characterName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="maxHitPoints">
                  <Form.Label>Maximum Hit Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxHitPoints"
                    value={formData.maxHitPoints}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="savingThrow">
                  <Form.Label>Saving Throw</Form.Label>
                  <Form.Control
                    type="number"
                    name="savingThrow"
                    value={formData.savingThrow}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="attackBonus">
                  <Form.Label>Attack Bonus</Form.Label>
                  <Form.Control
                    type="number"
                    name="attackBonus"
                    value={formData.attackBonus}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link to="/" className="btn btn-warning">
              Cancel
            </Link>
          </Form>
        </Container>
      );
    };

    // return (
    //     <div className="container-fluid">
    //         <h1 className="display-5">Character Sheet Manager</h1>
    //         <div className="d-flex flex-grow-1 justify-content-end">
    //             <Link id="btnAdd" to="/" className="btn btn-info">Go to Landing</Link>
    //         </div>
    //     </div>
    // );
// }

export default CharacterSheet;