// ProductCart.js
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

export const ProductCart = ({ id, productPic, name, price }) => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartActions.addToCart({ id, name, price, productPic }));
  };

  const handleButtonClick = () => {
    if (token !== null) {
      // User is logged in, add to cart
      addToCart();
    } else {
      // User is not logged in, show alert
      alert('Please login');
    }
  };

  return (
    <>
      <div className='box boxItems' id='product'>
        <div className='img'>
          {/* Pass the data as URL parameters when the image is clicked */}
          <Link to={`/productDetail/${id}`}>
            <img src={productPic} alt='cover' />
          </Link>
        </div>
        <div className='details'>
          <h3>${price}</h3>
          <p>{name}</p>
          <button onClick={handleButtonClick}>
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
    </>
  );
};
