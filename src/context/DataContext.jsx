import { createContext, Component } from "react";
import { client, Query } from "@tilework/opus";

const DataContext = createContext();

export class DataProvider extends Component {
  state = {
    selectedCurrency: { symbol: "$", label: "USD" },
    selectedProducts: [],
    category: null,
    categories: null,
    currencies: null,
    productsAllMin: null,
    productsInBasket: [],
    totalBasketPrice: 0,
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchCurrency();
  }

  fetchCategories = async () => {
    client.setEndpoint(
      process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
    );
    try {
      const categoriesQuery = new Query("categories", true).addFieldList([
        "name",
      ]);

      const { categories } = await client.post(categoriesQuery);
      this.setState({ categories: categories });
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };

  fetchCurrency = async () => {
    client.setEndpoint(
      process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
    );
    try {
      const currenciesQuery = new Query("currencies", true).addFieldList([
        "label",
        "symbol",
      ]);

      const { currencies } = await client.post(currenciesQuery);
      this.setState({ currencies: currencies });
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };

  fetchProdustsAllMini = async () => {
    try {
      client.setEndpoint(
        process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
      );
      const productsAllMinQuery = new Query("categories", true).addFieldList([
        "name, products{id, name, gallery, prices{amount, currency{symbol}} }",
      ]);
      const { res } = await client.post(productsAllMinQuery);
      this.setState({ productsAllMin: res });
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };

  setSelectedCurrency = (value, callback) =>
    this.setState({ selectedCurrency: value }, callback);

  setCategory = (value) => this.setState({ category: value });

  setSelectedProducts = (id, key, value, callback) => {
    !key || !value
      ? this.setState(
          {
            selectedProducts: {
              productId: id,
            },
          },
          callback
        )
      : this.state.selectedProducts.productId !== id
      ? this.setState(
          {
            selectedProducts: {
              productId: id,
              [key]: value,
            },
          },
          callback
        )
      : this.setState(
          (prevState) => ({
            selectedProducts: {
              ...prevState.selectedProducts,
              productId: id,
              [key]: value,
            },
          }),
          callback
        );
  };

  addProductToBasket = (selected, callback) => {
    !selected
      ? this.setState(
          (prevState) => ({
            productsInBasket: [
              { ...this.state.selected },
              ...prevState.productsInBasket,
            ],
          }),
          callback
        )
      : this.setState(
          (prevState) => ({
            productsInBasket: [{ ...selected }, ...prevState.productsInBasket],
          }),
          callback
        );
  };

  removeProductFromBasket = (indexOfProduct, callback) => {
    this.setState(
      (prevState) => ({
        productsInBasket: prevState.productsInBasket.filter(
          (_, index) => index !== indexOfProduct
        ),
      }),
      callback
    );
  };

  resetProductInBasket = () => {
    this.setState({ productsInBasket: [] });
    this.setState({ totalBasketPrice: 0 });
  };

  setTotalBasketPrice = (callback) => {
    this.setState(
      {
        totalBasketPrice: (
          Math.round(
            this.state.productsInBasket.reduce((acc, { prices }) => {
              prices.forEach((price) =>
                price.currency.symbol === this.state.selectedCurrency.symbol
                  ? (acc += price.amount)
                  : acc
              );
              return acc;
            }, 0) * 100
          ) / 100
        ).toFixed(2),
      },
      callback
    );
  };

  resetSelectedProduct = () => {
    this.setState({ selectedProducts: {} });
  };

  render() {
    const {
      selectedCurrency,
      selectedProducts,
      productsInBasket,
      category,
      categories,
      currencies,
      totalBasketPrice,
    } = this.state;
    const {
      fetchProdustsAllMini,
      setSelectedCurrency,
      setCategory,
      setSelectedProducts,
      addProductToBasket,
      resetSelectedProduct,
      removeProductFromBasket,
      setTotalBasketPrice,
      resetProductInBasket,
    } = this;

    return (
      <DataContext.Provider
        value={{
          selectedCurrency,
          selectedProducts,
          category,
          categories,
          currencies,
          fetchProdustsAllMini,
          setSelectedCurrency,
          setCategory,
          setSelectedProducts,
          addProductToBasket,
          resetSelectedProduct,
          productsInBasket,
          removeProductFromBasket,
          setTotalBasketPrice,
          totalBasketPrice,
          resetProductInBasket,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;
