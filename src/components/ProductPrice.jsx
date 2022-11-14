import React, { Component } from "react";
import DataContext from "../context/DataContext.jsx";

export class ProductPrice extends Component {
  render() {
    const { selectedCurrency } = this.context;
    const { product, showMenu } = this.props;
    if (product) {
      return (
        <div>
          {product.prices.map(
            (prc) =>
              selectedCurrency.symbol &&
              selectedCurrency.symbol === prc.currency.symbol && (
                <div
                  key={prc.currency.label}
                  className={
                    showMenu
                      ? "dropdown-cart-product-price "
                      : "product-page-price"
                  }
                >
                  {prc.currency.symbol}
                  {prc.amount}
                </div>
              )
          )}
        </div>
      );
    }
  }
}

ProductPrice.contextType = DataContext;
export default ProductPrice;
