import React, { Component } from "react";
import DataContext from "../context/DataContext";
export class AttributeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: [],
    };
  }
  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  };

  render() {
    const { productsInBasket, setSelectedProducts, selectedProducts } =
      this.context;
    const { attribute, item, onChange, setDefault, product, showMenu } =
      this.props;

    return attribute.type !== "swatch" ? (
      <div
        className={showMenu ? "dropdown-atrribute-button " : "atrribute-button"}
      >
        <input
          id={attribute.id}
          label={item.value.toUpperCase()}
          type="radio"
          name={attribute.name}
          // value={item.value}
          onChange={onChange}
          defaultChecked={
            !setDefault
              ? productsInBasket.find(
                  (prod) =>
                    prod.productId === product.id &&
                    prod[attribute.id] === item.id
                )
                ? true
                : false
              : false
          }
        ></input>
      </div>
    ) : (
      <div className={showMenu ? "dropdown-color-button " : "color-button"}>
        <input
          id={attribute.id}
          style={{ backgroundColor: item.value }}
          type="radio"
          name={attribute.name}
          // value={item.value}
          onChange={onChange}
          defaultChecked={
            productsInBasket.find(
              (prod) =>
                prod.productId === product.id && prod[attribute.id] === item.id
            )
              ? true
              : false
          }
        ></input>
      </div>
    );
  }
}

AttributeButton.contextType = DataContext;
export default AttributeButton;
