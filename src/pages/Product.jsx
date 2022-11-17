import { Component } from "react";
import { client, Query } from "@tilework/opus";
import DataContext from "../context/DataContext.jsx";
import { withParams } from "../higherOrderComponents/withParams.js";
import { withNavigation } from "../higherOrderComponents/withNavigation.js";
import Spinner from "../components/Spinner";
import ProductMiniImgList from "../components/ProductMiniImgList";
import ProductAttributes from "../components/ProductAttributes.jsx";
import ProductPrice from "../components/ProductPrice.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import Description from "../components/ProductDescriptionHtml.jsx";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: null,
      selectedImg: "",
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
        this.setState({ productData: res });
        this.setState({ selectedImg: res.product.gallery[0] });
      } catch (error) {
        console.error("Unable to fetch data");
      }
    };
    fetchProductData(id);
  }

  onClickImg = (e) => {
    this.setState({ selectedImg: e.target.src });
  };

  render() {
    const { selectedProducts, addProductToBasket, setTotalBasketPrice } =
      this.context;

    const productPriceHeder = "price:";

    if (!this.state.productData) return <Spinner />;
    else
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
                setDefault={true}
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
                    this.state.productData.product.attributes.length + 1 ||
                  this.state.productData.product.inStock === false
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

Product.contextType = DataContext;
export default withNavigation(withParams(Product));
