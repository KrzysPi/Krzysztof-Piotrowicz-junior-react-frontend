import { Component } from "react";
import DataContext from "../context/DataContext.jsx";
import ProductInCart from "../components/ProductInCart.jsx";
import { SubmitButton } from "../components/SubmitButton.jsx";
import { withParams } from "../higherOrderComponents/withParams.js";
import { withNavigation } from "../higherOrderComponents/withNavigation.js";

export class Cart extends Component {
  alertOnOrder = () => {
    this.context.productsInBasket.length !== 0
      ? alert(
          `Now You have to pay ${this.context.selectedCurrency.symbol}${
            this.context.totalBasketPrice
          } for ${this.context.productsInBasket.length} ${
            this.context.productsInBasket.length > 1 ? "products" : "product"
          }:\n ${this.context.productsInBasket.reduce(
            (acc, product, index) =>
              (acc += `${index + 1}. ${product.productId},\n`),
            ""
          )}`
        )
      : alert(`Your bsket is empty!`);
  };

  render() {
    const {
      productsInBasket,
      resetProductInBasket,
      selectedCurrency,
      totalBasketPrice,
    } = this.context;
    const TAX = 0.21;

    return (
      <div>
        <h1>CART</h1>
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
          <div className="cart-tax">
            <div id="title"> {`Tax ${TAX * 100}%:`} </div>
            <div id="value">{` ${selectedCurrency.symbol}${(
              totalBasketPrice * TAX
            ).toFixed(2)}`}</div>
          </div>

          <div className="cart-quantity">
            <div id="title">Quantity: </div>{" "}
            <div id="value"> {productsInBasket.length}</div>
          </div>
          <div className="cart-total-price">
            <div id="title"> Total: </div>
            <div id="value">{`${selectedCurrency.symbol}${totalBasketPrice}`}</div>
          </div>
        </div>
        <SubmitButton
          placeholder="ORDER"
          className="cart-order-button"
          onClick={() => {
            this.alertOnOrder();
            resetProductInBasket();
            this.props.navigate(`/all`);
          }}
        />
      </div>
    );
  }
}
Cart.contextType = DataContext;
export default withNavigation(withParams(Cart));
