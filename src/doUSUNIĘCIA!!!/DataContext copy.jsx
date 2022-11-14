import { useState, createContext, useEffect } from "react";
import { client, Query } from "@tilework/opus";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [categoriesResponse, setCategoriesResponse] = useState();
  const [currenciesResponse, setCurrenciesResponse] = useState();
  const [productsAllMin, setProductsAllMin] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const errorMessage = "Unable to fetch data";
  // State update
  useEffect(() => {
    fetchCategories();
    fetchCurrency();
  }, []);

  // Fetching categories
  client.setEndpoint(process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/");

  const fetchCategories = async () => {
    try {
      const categoriesQuery = new Query("categories", true).addFieldList([
        "name",
      ]);

      const { categories } = await client.post(categoriesQuery);
      setCategoriesResponse(categories);
      setIsLoading(false);
    } catch (error) {
      console.error(errorMessage);
    }
  };

  // Fetching currencies
  const fetchCurrency = async () => {
    try {
      const currenciesQuery = new Query("currencies", true).addFieldList([
        "label",
        "symbol",
      ]);

      const { currencies } = await client.post(currenciesQuery);
      setCurrenciesResponse(currencies);
      setIsLoading(false);
    } catch (error) {
      console.error(errorMessage);
    }
  };

  // Fetching minimal data for products listing
  const fetchProdustsAllMini = async () => {
    try {
      const productsAllMinQuery = new Query("categories", true).addFieldList([
        "name, products{id, name, gallery, prices{amount, currency{symbol}} }",
      ]);
      const res = await client.post(productsAllMinQuery);
      setProductsAllMin(res);
    } catch (error) {
      console.error(errorMessage);
    }
  };

  return (
    // W tym miejscu przypisujemy wsztskie zmienne i funkcje do context, dzięki czemu możemy je wykozystać w innych komponentach
    <DataContext.Provider
      value={{
        categoriesResponse,
        currenciesResponse,
        isLoading,
        fetchProdustsAllMini,
        productsAllMin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
