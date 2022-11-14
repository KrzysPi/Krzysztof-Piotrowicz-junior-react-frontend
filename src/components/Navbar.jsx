import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";
import { ReactComponent as CartIcon } from "../assets/svg/emptyCart.svg";
import DropdownCurrency from "./DropdownCurrency";
import { Component } from "react";
import DataContext from "../context/DataContext";
import { withNavigation } from "../middleware/withNavigation.js";
import DropdownCart from "./DropdownCart";

// const navigate = useNavigate();
// const location = useLocation();

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
        <ul className="navbarListItems">
          {categories &&
            categories.map((cat) => (
              <li
                key={cat.name}
                className="navbarListItem"
                onClick={(e) => {
                  e.stopPropagation();
                  setCategory(cat.name);
                  this.submitHandeler(cat.name);
                  // resetSelectedProduct();
                }}
              >
                <p
                  className={
                    category === cat.name
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  {cat.name.toUpperCase()}
                </p>
              </li>
            ))}
        </ul>
        <LogoIcon width="41px" height="41px" />
        <div className="navbarDropdownItems">
          <DropdownCurrency
            className="navbarListItem"
            placeHolder={currencies && currencies[0].symbol}
            options={currencies && currencies}
          />
          <DropdownCart />
          {/* <CartIcon
            className="navbarListItem"
            // fill={this.pathMatchRoute("/cartMini") ? "#5ece7b" : "#8f8f8f"}
            width="20px"
            height="18px"
          /> */}
        </div>
      </nav>
    );
  }
}

Navbar.contextType = DataContext;

export default withNavigation(Navbar);
