import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";
import { ReactComponent as CartIcon } from "../assets/svg/emptyCart.svg";
import Dropdown from "./Dropdown";
import { client, Query } from "@tilework/opus";
import { useEffect, useState, useContext } from "react";
import DataContext from "../context/DataContext";

// class Navbar( extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showMenu: false,
//       selectedCurrency: null,
//     };
//   }

function Navbar() {
  const { categories, currencies } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const { Query } = pkg;
  // fething data from GraphQL

  // funkcja zwrca thrue jezli znajdujemy sie na wybranej stronie
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <nav className="navbar-container">
      <ul className="navbarListItems">
        {categories &&
          categories.map((category) => (
            <li
              key={category.name}
              className="navbarListItem"
              onClick={() => navigate(`/category/${category.name}`)}
            >
              <p
                className={
                  pathMatchRoute(`/category/${category.name}`)
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                {category.name.toUpperCase()}
              </p>
            </li>
          ))}
      </ul>
      <LogoIcon width="41px" height="41px" />
      <div className="navbarDropdownItems">
        <Dropdown
          className="navbarListItem"
          placeHolder={currencies && currencies[0].symbol}
          options={currencies && currencies}
        />
        <CartIcon
          className="navbarListItem"
          fill={pathMatchRoute("/cartMini") ? "#5ece7b" : "#8f8f8f"}
          width="20px"
          height="18px"
        />
      </div>
    </nav>
  );
}

export default Navbar;
