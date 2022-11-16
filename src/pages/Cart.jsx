import { Component } from "react";
import DataContext from "../context/DataContext.jsx";
import ProductInCart from "../components/ProductInCart.jsx";
import Spinner from "../components/Spinner.jsx";

import { SubmitButton } from "../components/SubmitButton.jsx";
export class Cart extends Component {
  // localStorageTheArray = JSON.parse(localStorage.getItem("theArray"));
  render() {
    const {
      selectedProducts,
      productsInBasket,
      selectedCurrency,
      totalBasketPrice,
      setTotalBasketPrice,
    } = this.context;
    const TAX = 0.21;
    // if (!productsInBasket) return <Spinner />;
    // else
    return (
      <div className="cart-container">
        <h2>CART</h2>
        {productsInBasket
          .filter(
            (item, index, arr) =>
              arr
                .map((product) => product["productId"])
                .indexOf(item["productId"]) === index
          )
          .map((item, index) => (
            <ProductInCart
              key={`${index}-${item.productId}`}
              productInCart={item}
            />
          ))}
        <div className="cart-summary">
          <div className="tax">
            <div id="title"> {`Tax ${TAX * 100}%:`} </div>
            <div id="value">{` ${selectedCurrency.symbol}${(
              totalBasketPrice * TAX
            ).toFixed(2)}`}</div>
          </div>

          <div className="quantity">
            <div id="title">Quantity: </div>{" "}
            <div id="value"> {productsInBasket.length}</div>
          </div>
          <div className="total-price">
            <div id="title"> Total: </div>{" "}
            <div id="value">{totalBasketPrice}</div>
          </div>
        </div>
        <SubmitButton
          placeholder="ORDER"
          className="order-button"
          onClick={(e) => {
            e.preventDefault();
            console.log("Realized");
            console.log(productsInBasket);
            console.log(selectedProducts);
            console.log(
              productsInBasket.reduce((acc, { prices }) => {
                prices.forEach((price) =>
                  price.currency.symbol === selectedCurrency.symbol
                    ? (acc += price.amount)
                    : acc
                );
                return acc;
              }, 0)
            );
          }}
        />
      </div>
    );
  }
}
Cart.contextType = DataContext;
export default Cart;
