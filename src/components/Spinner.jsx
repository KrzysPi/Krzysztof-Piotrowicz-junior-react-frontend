import React, { Component } from "react";
export class Spinner extends Component {
  render() {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}

export default Spinner;
