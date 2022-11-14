import React, { Component } from "react";

export class ProductMiniImgList extends Component {
  render() {
    const gallery = this.props.gallery;
    if (!gallery) {
      return;
    }
    return (
      <div className="img-mini-list">
        {gallery.map((img, i) => (
          <img
            src={img}
            alt="Product foto"
            key={i}
            className="img-mini-list-img"
            onClick={this.props.onClick}
          />
        ))}
      </div>
    );
  }
}

export default ProductMiniImgList;
