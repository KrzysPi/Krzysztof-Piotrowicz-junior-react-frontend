import { Component } from "react";
import { client, Query } from "@tilework/opus";
import DataContext from "../context/DataContext.jsx";
import ProductAttributes from "../components/ProductAttributes.jsx";
import ProductPrice from "../components/ProductPrice.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import Spinner from "../components/Spinner";
import CartSlideshow from "./CartSlideshow.jsx";
import ProductQuantity from "./ProductQuantity.jsx";

export class ProductInCart extends Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      productData: null,
    };
  }

  componentDidMount() {
    const id = this.props.productInCart.productId;

    const fetchProductData = async (id) => {
      try {
        client.setEndpoint(
          process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
        );
        const producDataQuery = new Query("product", true)
          .addArgument("id", "String!", id)
          .addFieldList([
            "id, name, brand, gallery, attributes{id,name,type,  items{displayValue, value,id}} prices{amount, currency{symbol, label}}",
          ]);

        const res = await client.post(producDataQuery);
        this.setState({ productData: res });
        // this.setState({ selectedImg: await res.product.gallery[0] });
      } catch (error) {
        console.error("Unable to fetch data");
      }
    };
    fetchProductData(id);
  }

  render() {
    const { productInCart, showMenu } = this.props;
    const { selectedProducts, productsInBasket, setSelectedProducts } =
      this.context;
    if (this.state.productData) {
      // console.log(this.state.productData);
      return (
        <div
          className={
            showMenu
              ? "dropdown-cart-product-container"
              : "product-cart-container"
          }
        >
          <div
            className={
              showMenu ? "dropdown-cart-product-info " : "product-cart-info"
            }
          >
            <div
              className={
                showMenu
                  ? "dropdown-cart-product-info-brand "
                  : "product-cart-info-brand"
              }
            >
              {this.state.productData.product.brand}
            </div>
            <div
              className={
                showMenu
                  ? "dropdown-cart-product-info-name "
                  : "product-cart-info-name"
              }
            >
              {this.state.productData.product.name}
            </div>
            <form>
              <ProductPrice
                showMenu={showMenu}
                product={this.state.productData.product}
              />
              <ProductAttributes
                product={this.state.productData.product}
                productInCart={productInCart}
                setDefault={false}
                onChange={"basket"}
                showMenu={showMenu}
                // onChange={this.onAttributeChange(setSelectedProducts)}

                // selectedAttributes={this.props.productData}
              />
            </form>
          </div>
          <div style={{ display: "flex" }}>
            <ProductQuantity
              showMenu={showMenu}
              productInCart={productInCart}
            />
            <CartSlideshow showMenu={showMenu} gallery={this.state.productData.product.gallery} />
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default ProductInCart;
