import { Component } from "react";
import ListingItem from "../components/ListingItem.jsx";
import DataContext from "../context/DataContext.jsx";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsAllMin: null,
      name: null,
      price: null,
      image: null,
    };
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  submitHandeler = (route) => {
    this.props.navigate(`/category/:${route}`);
  };

  render() {
    const { category } = this.context;
    let { categoryName } = this.props;

    return (
      <div className="category-text">
        <header>
          {category && (
            <p className="pageHeader">{this.capitalizeFirstLetter(category)}</p>
          )}
        </header>
        <ListingItem />
      </div>
    );
  }
}

Category.contextType = DataContext;

export default Category;
