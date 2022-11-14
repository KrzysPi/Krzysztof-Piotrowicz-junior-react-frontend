import React, { Component } from "react";
import AttributeButton from "../components/AttributeButton.jsx";
import DataContext from "../context/DataContext";

export class ProductAttributes extends Component {
  // renderAtributes = (attributes) => {
  //     attributes.map((atr) => (<div key={atr.id}>{atr.id}</div>));
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.productInCart,
    };
  }
  render() {
    const {
      productsInBasket,
      setSelectedProducts,
      removeProductFromBasket,
      addProductToBasket,
      selectedProducts,
    } = this.context;
    const { showMenu, product, onChange, setDefault, productInCart } =
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
                  onChange={(e) => {
                    if (onChange === "product") {
                      setSelectedProducts(product.id, atr.id, item.id);
                      console.log(selectedProducts);
                    } else if (onChange === "basket") {
                      this.setState(
                        (prevState) => ({
                          selected: {
                            ...prevState.selected,
                            productId: product.id,
                            [atr.id]: item.id,
                            prices: [...product.prices],
                          },
                        }),
                        () => {
                          removeProductFromBasket(
                            productsInBasket.indexOf(productInCart)
                          );
                          addProductToBasket(this.state.selected);
                        }
                      );
                    } else {
                      console.error("onChange not defined");
                    }
                  }}
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
