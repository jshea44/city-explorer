import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Map from './Components/Map';
import Weather from './Components/Weather';
import Movie from './Components/Movie';
const VITE_LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const PORT_LOCATION = import.meta.env.VITE_PORT_LOCATION;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      forecasts: null,
      searchQuery: '',
      showModal: false,
      error: null,
      movies: null,
    };
  }

  handleForm = (e) => {
    console.log('Form handled');
    e.preventDefault();
    axios
      .get(
        `https://us1.locationiq.com/v1/search?key=${VITE_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`
      )
      .then((response) => {
        this.setState({ location: response.data[0] });
        return axios.get(
          `${PORT_LOCATION}/weather?searchQuery=${this.state.searchQuery}&lat=${response.data[0].lat}&lon=${response.data[0].lon}`
        );
      })
      .then((response) => {
        this.setState({ forecasts: response.data });
        return axios.get(
          `${PORT_LOCATION}/movie?searchQuery=${this.state.searchQuery}`
        );
      })
      .then((response) => {
        this.setState({ movies: response.data });
      })

      .catch((error) => {
        console.log('ERROR: ', error);
        this.setState({ error: error });
        this.modalOpen();
      });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () =>
      console.log(this.state.searchQuery)
    );
  };

  modalOpen = () => {
    console.log('modal opened');
    this.setState({ showModal: true });
  };

  modalClose = () => {
    console.log('modal closed');
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
              City:{' '}
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
          <Weather forecasts={this.state.forecasts} />
          <Movie movies={this.state.movies} />
        </Form>
        {this.state.error ? (
          <Modal show={this.state.showModal} onHide={this.modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.error.message}</Modal.Body>
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
