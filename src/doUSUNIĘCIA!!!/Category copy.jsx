import { client, Query } from "@tilework/opus";
import { Component, useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext.jsx";
import Spinner from "../components/Spinner.jsx";
import { withNavigation } from "../middleware/withNavigation.js";
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

  componentDidMount() {
    this.fetchProdustsAllMini();
  }

  fetchProdustsAllMini = async () => {
    try {
      client.setEndpoint(
        process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/"
      );
      const productsAllMinQuery = new Query("categories", true).addFieldList([
        "name, products{id, name, gallery, prices{amount, currency{symbol, label}} }",
      ]);
      const res = await client.post(productsAllMinQuery);
      this.setState({ productsAllMin: res });
      console.log(this.state.productsAllMin);
    } catch (error) {
      console.error("Unable to fetch data");
    }
  };
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  submitHandler =(route) =>{
    //successful login 
    this.props.navigate('/dashboard');

  render() {
    //  let {name, products: {0:{id }}} = this.state.productsAllMin.categories
    const { category, selectedCurrency } = this.context;

    return (
      <div className="category">
        <header>
          {category && (
            <p className="pageHeader">{this.capitalizeFirstLetter(category)}</p>
          )}
        </header>
        <div>
          {this.state.productsAllMin &&
            this.state.productsAllMin.categories.map(
              (cat) =>
                cat.name === category && (
                  <div key={cat.name}>
                    {cat.products.map((prod) => (
                      <div key={prod.id}>
                        <img src={prod.gallery[0]}></img>
                        {prod.name}
                        <div key={prod.id}>
                          {prod.prices.map(
                            (prc) =>
                              selectedCurrency.symbol &&
                              selectedCurrency.symbol ===
                                prc.currency.symbol && (
                                <div key={prc.currency.label}>
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
      </div>
    );
  }
}

Category.contextType = DataContext;

export default Category;
