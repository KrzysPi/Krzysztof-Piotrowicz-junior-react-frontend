import React, { Component } from "react";
import { ReactComponent as Icon } from "../assets/svg/dropdownOpen.svg";
import DataContext from "../context/DataContext";

class DropdownCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  componentDidMount() {
    const handler = () => this.setState({ showMenu: false });
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }

  handleInputClick = (e) => {
    e.stopPropagation();
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { selectedCurrency, setSelectedCurrency, setTotalBasketPrice } =
      this.context;
    const { placeHolder, options } = this.props;

    return (
      <div className="dropdown-container">
        <div onClick={this.handleInputClick} className="dropdown-input">
          <div className="dropdown-selected-value">
            {selectedCurrency ? selectedCurrency.symbol : placeHolder}
          </div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              <Icon
                className={
                  this.state.showMenu ? "dropdown-icon" : "dropdown-icon-closed"
                }
              />
            </div>
          </div>
        </div>
        {this.state.showMenu && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div
                onClick={() => {
                  setSelectedCurrency(option, setTotalBasketPrice);
                }}
                key={option.symbol}
                className={`dropdown-item ${
                  !selectedCurrency
                    ? false
                    : selectedCurrency.label === option.label && "selected"
                }`}
              >
                {`${option.symbol} ${option.label}`}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DropdownCurrency.contextType = DataContext;

export default DropdownCurrency;
