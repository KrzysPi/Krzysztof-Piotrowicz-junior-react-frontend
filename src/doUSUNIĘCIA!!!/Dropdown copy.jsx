import React, { useEffect, useState } from "react";
import { ReactComponent as Icon } from "../assets/svg/dropdownOpen.svg";

const Dropdown = ({ placeHolder, options }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.symbol;
    }
    return placeHolder;
  };

  const onItemClick = (option) => setSelectedValue(option);
  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.label === option.label;
  };

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon
              className={showMenu ? "dropdown-icon" : "dropdown-icon-closed"}
            />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.symbol}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {`${option.symbol} ${option.label}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
