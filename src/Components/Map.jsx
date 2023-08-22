import React from "react";
// import axios from "axios";
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class Map extends React.Component {
  constructor() {
    super();
  }

  render() {
    let staticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.props.location.lat},${this.props.location.lon}&zoom=9`;
    return (
      <>
        <img src={staticMapUrl} alt="map" />
      </>
    );
  }
}

export default Map;
