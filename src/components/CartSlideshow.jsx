import React, { Component } from "react";

export class CartSlideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  changeSlides(n) {
    ((n === -1 && this.state.index > 0) ||
      (n === 1 && this.state.index < this.props.gallery.length - 1)) &&
      this.setState({ index: this.state.index + n });
  }

  render() {
    const { showMenu } = this.props;
    const gallery = this.props.gallery;
    let buttons;
    if (!showMenu) {
      buttons = (
        <>
          <button
            type="button"
            className="prev"
            onClick={(e) => {
              e.preventDefault();
              this.changeSlides(-1);
            }}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="next"
            onClick={(e) => {
              e.preventDefault();
              this.changeSlides(1);
            }}
          >
            {">"}
          </button>
        </>
      );
    }

    if (gallery) {
      return (
        <div
          className={
            showMenu ? "dropdown-slideshow-container " : "slideshow-container"
          }
        >
          <img
            src={gallery[this.state.index]}
            alt="Product foto"
            className={showMenu ? "dropdown-slideshow-img " : "slideshow-img"}
          />
          {buttons}
        </div>
      );
    }
  }
}

export default CartSlideshow;
