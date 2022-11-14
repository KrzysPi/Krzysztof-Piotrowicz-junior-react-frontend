import React, { Component } from "react";

export class SubmitButton extends Component {
  render() {
    const { className, onClick, disabled, placeholder } = this.props;
    return (
      <button
        type="submit"
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {placeholder.toUpperCase()}
      </button>
    );
  }
}

export default SubmitButton;
