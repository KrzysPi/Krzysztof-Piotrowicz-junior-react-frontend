import React, { Component } from "react";
import AttributeButton from "../components/AttributeButton.jsx";
import DataContext from "../context/DataContext";

export class ProductAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.productInCart,
    };
  }

  onClickAtrBtn = (atr, item) => {
    if (this.props.onChange === "product") {
      this.context.setSelectedProducts(this.props.product.id, atr.id, item.id);
    } else if (this.props.onChange === "basket") {
      this.setState(
        (prevState) => ({
          selected: {
            ...prevState.selected,
            productId: this.props.product.id,
            [atr.id]: item.id,
            prices: [...this.props.product.prices],
          },
        }),
        () => {
          this.context.removeProductFromBasket(
            this.context.productsInBasket.indexOf(this.props.productInCart)
          );
          this.context.addProductToBasket(this.state.selected);
        }
      );
    } else {
      console.error("<AttributeButton> onChange not defined");
    }
  };

  render() {
 
    const { showMenu, product, setDefault} =
      this.props;
    if (!this.props.product) {
      return;
    }
    return (
      <div className="product-attributes">
        {product.attributes.map((atr, index) => (
          <div className="product-info-attribute" key={index}>
            <label
              className={
                showMenu
                  ? "dropdown-cart-product-info-attribute-name "
                  : "product-info-attribute-name"
              }
              key={atr.id}
              htmlFor={atr.id}
            >
              {atr.name.toUpperCase()}:
            </label>

            <div style={{ display: "flex", overflow: "clip" }}>
              {atr.items.map((item) => (
                <AttributeButton
                  showMenu={showMenu}
                  product={product}
                  item={item}
                  attribute={atr}
                  key={item.id}
                  setDefault={setDefault}
                  onChange={() => this.onClickAtrBtn(atr, item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ProductAttributes.contextType = DataContext;
export default ProductAttributes;
