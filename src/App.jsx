import React from "react";
import Form from "react-bootstrap/Form";
import { Button, ListGroupItem } from "react-bootstrap";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ListGroup from "react-bootstrap/ListGroup";
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      searchQuery: "",
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
      });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () =>
      console.log(this.state.searchQuery)
    );
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
        </Form>
        <ListGroup>
          <ListGroupItem>
            City: {this.state.location[0].display_name}
          </ListGroupItem>
          <ListGroupItem>Latitude: {this.state.location[0].lat} </ListGroupItem>
          <ListGroupItem>Longitue: {this.state.location[0].lon} </ListGroupItem>
        </ListGroup>
      </>
    );
  }
}

export default App;
