import { Component } from "react";
import { client, Query } from "@tilework/opus";
import DataContext from "../context/DataContext.jsx";
import { withNavigation } from "../higherOrderComponents/withNavigation.js";
import { ReactComponent as GreenCartIcon } from "../assets/svg/greenCart.svg";
import Spinner from "./Spinner.jsx";

class ListingItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: "",
      productsAll: null,
    };
  }

  componentDidMount() {
    this.fetchProdustsAllMini();
  }

  fetchProdustsAllMini = async () => {
    try {
      client.setEndpoint(
        process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
      );
      const productsAllMinQuery = new Query("categories", true).addFieldList([
        "name, products{id, name, brand, inStock, gallery,  attributes{id,name,type,  items{displayValue, value,id}} prices{amount, currency{symbol, label}} }",
      ]);
      const res = await client.post(productsAllMinQuery);
      this.setState({ productsAll: res });
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };

  navigateHandeler = (id) => {
    this.props.navigate(`/product/${id}`);
  };

  onClickIcon = (prod, e) => {
    e.preventDefault();
    let obj = {
      productId: prod.id,
      prices: [...prod.prices],
    };
    prod.attributes.forEach((atr) => {
      obj[atr.id] = atr.items[0].id;
    });
    this.context.addProductToBasket(obj, this.context.setTotalBasketPrice);
  };

  render() {
    const {
      category,
      selectedCurrency,
      setSelectedProducts,
      resetSelectedProduct,
    } = this.context;

    if (!this.state.productsAll) return <Spinner />;
    else
      return (
        <div className="listing-items-container">
          {this.state.productsAll &&
            this.state.productsAll.categories.map(
              (cat) =>
                cat.name === category && (
                  <div key={cat.name} className="listing-item-list">
                    {cat.products.map((prod) => (
                      <div
                        onMouseEnter={() => this.setState({ hover: prod.id })}
                        onMouseLeave={() => this.setState({ hover: "" })}
                        key={prod.id}
                        className="listing-item"
                        onClick={(e) => {
                          if (e.target.nodeName !== "circle") {
                            e.stopPropagation();
                            this.navigateHandeler(prod.id);
                            resetSelectedProduct();
                            setSelectedProducts(prod.id);
                          }
                        }}
                      >
                        <img
                          src={prod.gallery[0]}
                          alt={prod.name}
                          className={
                            !prod.inStock
                              ? "listing-item-img-out"
                              : "listing-item-img"
                          }
                        ></img>
                        {!prod.inStock && (
                          <div className="listing-item-img-out-text">
                            OUT OF STOCK
                          </div>
                        )}

                        {prod.inStock && this.state.hover === prod.id && (
                          <GreenCartIcon
                            id="icon"
                            className="listing-cart-icon"
                            onClick={(e) => this.onClickIcon(prod, e)}
                          ></GreenCartIcon>
                        )}
                        <div className="listing-product-name">
                          {prod.brand} {prod.name}
                        </div>
                        <div key={prod.id}>
                          {prod.prices.map(
                            (prc) =>
                              selectedCurrency.symbol &&
                              selectedCurrency.symbol ===
                                prc.currency.symbol && (
                                <div
                                  key={prc.currency.label}
                                  className="listing-product-price"
                                >
                                  {prc.currency.symbol} {prc.amount}
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
            )}
        </div>
      );
  }
}

ListingItems.contextType = DataContext;
export default withNavigation(ListingItems);
