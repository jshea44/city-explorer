import React from 'react';

class Weather extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        {this.props.forecasts
          ? this.props.forecasts.map((forecast, idx) => {
              return (
                <div key={idx}>
                  <p>{forecast.date}</p>
                  <p>{forecast.description}</p>
                </div>
              );
            })
          : null}
      </>
    );
  }
}

export default Weather;
