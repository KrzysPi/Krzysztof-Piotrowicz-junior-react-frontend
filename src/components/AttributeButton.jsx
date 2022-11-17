import React, { Component } from "react";
import DataContext from "../context/DataContext";
export class AttributeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggleDefaultCheck = () =>
    !this.props.setDefault
      ? this.context.productsInBasket.find(
          (prod) =>
            prod.productId === this.props.product.id &&
            prod[this.props.attribute.id] === this.props.item.id
        )
      : false;

  render() {
    const { attribute, item, onChange,showMenu } =
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
          onChange={onChange}
          defaultChecked={this.toggleDefaultCheck()}
        ></input>
      </div>
    ) : (
      <div className={showMenu ? "dropdown-color-button " : "color-button"}>
        <input
          id={attribute.id}
          style={{ backgroundColor: item.value }}
          type="radio"
          name={attribute.name}
          onChange={onChange}
          defaultChecked={this.toggleDefaultCheck()}
        ></input>
      </div>
    );
  }
}

AttributeButton.contextType = DataContext;
export default AttributeButton;
