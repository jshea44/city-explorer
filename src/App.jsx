import React from "react";
import Form from "react-bootstrap/Form";
import { Button, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Map from "./Components/Map";
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      searchQuery: "",
      showModal: false,
      errorMsg: null,
    };
  }

  handleForm = (e) => {
    console.log("Form handled");
    e.preventDefault();
    axios
      .get(
        `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`
      )
      .then((response) => {
        console.log("SUCCESS: ", response.data);
        this.setState({ location: response.data[0] });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        this.setState({ errorMsg: error });
      });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () =>
      console.log(this.state.searchQuery)
    );
  };

  modalOpen = () => {
    console.log("modal opened");
    this.setState({ showModal: true });
  };

  modalClose = () => {
    console.log("modal closed");
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <header>
          <h1>City Explorer!</h1>
        </header>

        <Form onSubmit={this.handleForm}>
          <Form.Label>Name Of City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            onChange={this.handleChange}
          />
          <Button type="submit">Explore!</Button>
          <ListGroup>
            <ListGroupItem>
              City:{" "}
              {this.state.location ? this.state.location.display_name : null}
            </ListGroupItem>
            <ListGroupItem>
              Latitude: {this.state.location ? this.state.location.lat : null}
            </ListGroupItem>
            <ListGroupItem>
              Longitue: {this.state.location ? this.state.location.lon : null}
            </ListGroupItem>
          </ListGroup>
          {this.state.location ? (
            <Map location={this.state.location}></Map>
          ) : null}
        </Form>
        {this.state.errorMsg ? (
          <Modal show={this.modalOpen} onHide={this.modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.modalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default App;
