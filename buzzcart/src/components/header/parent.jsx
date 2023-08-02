import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import productService from "../../services/productServices";

export const ParentComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        const responseData = res.data.data; // Access the array of products from the response
        setProducts(responseData); // Set the products state with the array of products
      })
      .catch((err) => console.log(err));
  }, []);
  


  return (
    <div>
      <Header products={products} setSearchResults={setSearchResults} />
    </div>
  );
};

