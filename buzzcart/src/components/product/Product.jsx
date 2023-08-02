import React, { useEffect, useState } from "react";
import "./product.css"
import productService from "../../services/productServices";
import { ProductCart } from "./ProductCart"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState("");

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className='product'>
        <div className='container grid3'>
          {products &&
            products?.data.map((product) => (
              
            <ProductCart key={product._id} id={product._id} name={product.name} price={product.price} productPic={`http://localhost:4000${product.photos[0]}`}/>
          ))}
        </div>
      </section>
    </>
  )
}
