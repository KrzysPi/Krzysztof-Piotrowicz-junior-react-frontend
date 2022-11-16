// import PropTypes from "prop-types";
import React, { Component } from "react";

// !!! Assumption: data provider have already sanitized html
export class ProductDescriptionHtml extends Component {
  render() {
    return (
      <div
        className="product-info-description"
        dangerouslySetInnerHTML={{
          __html: this.props.description,
        }}
      ></div>
    );
  }
}

export default ProductDescriptionHtml;
