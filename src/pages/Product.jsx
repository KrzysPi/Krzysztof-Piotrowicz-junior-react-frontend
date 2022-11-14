import { Component } from "react";
import { client, Query } from "@tilework/opus";
import DataContext from "../context/DataContext.jsx";
import { withParams } from "../middleware/withParams.js";
import { withNavigation } from "../middleware/withNavigation.js";
import ProductMiniImgList from "../components/ProductMiniImgList";
import ProductAttributes from "../components/ProductAttributes.jsx";
import ProductPrice from "../components/ProductPrice.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import Description from "../components/DescriptionHTML.jsx";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: null,
      selectedImg: "",
      // selectedItem: [],
    };
  }
  componentDidMount() {
    const { id } = this.props.params;
    const fetchProductData = async (id) => {
      try {
        client.setEndpoint(
          process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
        );
        const producDataQuery = new Query("product", true)
          .addArgument("id", "String!", id)
          .addFieldList([
            "id, name, brand, description ,inStock, gallery, attributes{id,name,type,  items{displayValue, value,id}} prices{amount, currency{symbol, label}}",
          ]);

        const res = await client.post(producDataQuery);
        console.log(res);
        this.setState({ productData: res });
        this.setState({ selectedImg: res.product.gallery[0] });
      } catch (error) {
        console.error("Unable to fetch data");
      }
    };
    fetchProductData(id);
  }

  onClickImg = (e) => {
    // e.stopPropagation();
    this.setState({ selectedImg: e.target.src });
  };

  onClick = (e) => {
    e.preventDefault();
    console.log(e.target.name);
  };

  // addProductToLocalStorage = (id, content) => {
  //   localStorage.setItem(id, JSON.stringify(content));
  // };

  // handleChange = (event) => {
  //   this.setState({
  //     // the map method doesn't mutate the original array, it returns a new one
  //     data: this.state.selectedItem.map((item) => {
  //       // iterate through the array to find the right item to update
  //       if (item.product !== event.target.name) {
  //         // not match, so we won't change anything here
  //         return item;
  //       } else {
  //         // match, we return the updated value
  //         return {
  //           title: item.title,
  //           // event.target.value is a string, but the state uses number so we have to convert it
  //           status: Number(event.target.value),
  //         };
  //       }
  //     }),
  //   });
  // };

  render() {
    const {
      selectedProducts,
      addProductToBasket,
      setTotalBasketPrice,
      resetSelectedProduct,
      setSelectedProducts,
      productsInBasket,
    } = this.context;
    const productPriceHeder = "price:";
    // setSelectedProducts()

    if (this.state.productData) {
      return (
        <div className="product-container">
          <ProductMiniImgList
            gallery={this.state.productData.product.gallery}
            onClick={this.onClickImg}
          />
          <img
            src={this.state.selectedImg}
            alt="Product foto"
            className="product-big-img"
          />
          <div className="product-info">
            <div className="product-info-brand">
              {this.state.productData.product.brand}
            </div>
            <div className="product-info-name">
              {this.state.productData.product.name}
            </div>
            <form>
              <ProductAttributes
                product={this.state.productData.product}
                default={true}
                onChange={"product"}
              />
              <div className="product-price-header">
                {productPriceHeder.toUpperCase()}
              </div>
              <ProductPrice product={this.state.productData.product} />
              <SubmitButton
                placeholder="add to card"
                className="add-to-cart-button"
                onClick={(e) => {
                  e.preventDefault();
                  addProductToBasket(
                    {
                      ...selectedProducts,
                      prices: [...this.state.productData.product.prices],
                    },
                    setTotalBasketPrice,
                    this.props.navigate(`/cart`)
                  );
                }}
                disabled={
                  Object.keys(selectedProducts).length !==
                  this.state.productData.product.attributes.length + 1
                }
              />
              <Description
                description={this.state.productData.product.description}
              />
            </form>
          </div>
        </div>
      );
    }
  }
}

Product.contextType = DataContext;
export default withNavigation(withParams(Product));
