import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";
import DropdownCurrency from "./DropdownCurrency";
import { Component } from "react";
import DataContext from "../context/DataContext";
import { withNavigation } from "../higherOrderComponents/withNavigation.js";
import DropdownCart from "./DropdownCart";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  submitHandeler = (rout) => {
    this.props.navigate(`/${rout}`);
  };
  render() {
    const { categories, currencies, setCategory, category } = this.context;

    return (
      <nav className="navbar-container">
        <ul className="navbar-categories">
          {categories &&
            categories.map((cat) => (
              <li
                key={cat.name}
                className="navbar-category"
                onClick={(e) => {
                  e.stopPropagation();
                  setCategory(cat.name);
                  this.submitHandeler(cat.name);
                }}
              >
                <p
                  className={
                    category === cat.name
                      ? "navbar-category-name-active"
                      : "navbar-category-name"
                  }
                >
                  {cat.name.toUpperCase()}
                </p>
              </li>
            ))}
        </ul>
        <LogoIcon width="41px" height="41px" />
        <div className="navbar-dropdown-menues">
          <DropdownCurrency
            placeHolder={currencies && currencies[0].symbol}
            options={currencies && currencies}
          />
          <DropdownCart />
        </div>
      </nav>
    );
  }
}

Navbar.contextType = DataContext;

export default withNavigation(Navbar);
