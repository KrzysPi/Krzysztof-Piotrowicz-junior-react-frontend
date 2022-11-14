import React, { Component } from "react";
import DataContext from "../context/DataContext.jsx";
import { ReactComponent as PlusIcon } from "../assets/svg/plusButton.svg";
import { ReactComponent as MinusIcon } from "../assets/svg/minusButton.svg";

export class ProductQuantity extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const id = this.props.productInCart.productId;
    const { showMenu, productInCart } = this.props;
    const {
      productsInBasket,
      addProductToBasket,
      removeProductFromBasket,
      setTotalBasketPrice,
    } = this.context;
    return (
      <div
        className={
          showMenu
            ? "dropdown-quantity-btn-container "
            : "quantity-btn-container"
        }
      >
        <PlusIcon
          type="button"
          className={showMenu ? "dropdown-quantity-btn  " : "quantity-btn"}
          onClick={(e) => {
            e.preventDefault();
            addProductToBasket(productInCart, setTotalBasketPrice);
          }}
        />

        <div
          className={
            showMenu ? "dropdown-quantity-display  " : "quantity-display"
          }
        >
          {productsInBasket.reduce(
            (quantity, product) =>
              product.productId === id ? (quantity += 1) : quantity,
            0
          )}
        </div>
        <MinusIcon
          type="button"
          className={showMenu ? "dropdown-quantity-btn  " : "quantity-btn"}
          onClick={(e) => {
            e.preventDefault();
            removeProductFromBasket(
              productsInBasket.indexOf(productInCart),
              setTotalBasketPrice
            );
          }}
        />
      </div>
    );
  }
}
ProductQuantity.contextType = DataContext;
export default ProductQuantity;
