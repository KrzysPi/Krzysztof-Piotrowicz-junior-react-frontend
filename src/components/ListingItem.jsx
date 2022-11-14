import { Component } from "react";
import { client, Query } from "@tilework/opus";
import DataContext from "../context/DataContext.jsx";
import { withNavigation } from "../middleware/withNavigation.js";
import { ReactComponent as GreenCartIcon } from "../assets/svg/greenCart.svg";

class ListingItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: "",
      productsAllMin: null,
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
      this.setState({ productsAllMin: res });
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };

  navigateHandeler = (id) => {
    this.props.navigate(`/product/${id}`);
  };

  render() {
    //  let {name, products: {0:{id }}} = this.state.productsAllMin.categories
    const {
      category,
      selectedCurrency,
      setSelectedProducts,
      selectedProducts,
      resetSelectedProduct,
      addProductToBasket,
      productsInBasket,
    } = this.context;

    return (
      <div className="listingItemsContainer">
        {this.state.productsAllMin &&
          this.state.productsAllMin.categories.map(
            (cat) =>
              cat.name === category && (
                <div key={cat.name} className="listingItemList">
                  {cat.products.map((prod) => (
                    <div
                      onMouseEnter={() => this.setState({ hover: prod.id })}
                      onMouseLeave={() => this.setState({ hover: "" })}
                      key={prod.id}
                      className="listingItem"
                      onClick={(e) => {
                        if (e.target.nodeName !== "circle") {
                          e.stopPropagation();
                          this.navigateHandeler(prod.id);
                          resetSelectedProduct();
                          setSelectedProducts(prod.id);
                          console.log(selectedProducts);
                        }
                      }}
                    >
                      <img
                        src={prod.gallery[0]}
                        alt={prod.name}
                        className={
                          !prod.inStock
                            ? "listin-item-img-out"
                            : "listin-item-img"
                        }
                      ></img>
                      {!prod.inStock && (
                        <div className="listin-item-img-out-text">
                          OUT OF STOCK
                        </div>
                      )}

                      {prod.inStock && this.state.hover === prod.id && (
                        <GreenCartIcon
                          id="icon"
                          className="cart-count1"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(prod);

                            // console.log(prod.id, atr.id, atr.items[0].value);
                            // setSelectedProducts(
                            //   prod.id,
                            //   console.log(selectedProducts)
                            // );
                            prod.attributes.forEach((atr) => {
                              let obj = {
                                productId: prod.id,
                                prices: [...prod.prices],
                              };
                              obj[atr.id] = atr.items[0].value;
                              // setSelectedProducts(
                              //   prod.id,
                              //   atr.id,
                              //   atr.items[0].value,
                              addProductToBasket(
                                obj,
                                console.log(productsInBasket)
                                // )
                              );
                            });
                          }}
                        ></GreenCartIcon>
                      )}
                      <div className="listing-product-name">
                        {prod.brand} {prod.name}
                      </div>
                      <div key={prod.id}>
                        {prod.prices.map(
                          (prc) =>
                            selectedCurrency.symbol &&
                            selectedCurrency.symbol === prc.currency.symbol && (
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
