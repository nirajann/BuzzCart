import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetail.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import CommentsSection from "./comment"; // Import the CommentsSection component

export const ProductDetailPage = (props) => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userRated, setUserRated] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:4000/product/${productId}`, config);

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddRating = async () => {
    const key = productId;
    try {
      const userId = localStorage.getItem(`userid`);
      const data = {
        userId: userId,
        value: rating,
        productId: key,
      };

      console.log('Request Data:', data);

      const response = await axios.post(`http://localhost:4000/product/${key}/addreview`, data);

      console.log('Response:', response.data);

      // Fetch the updated product data
      const updatedProduct = await axios.get(`http://localhost:4000/product/${productId}`);
      setProduct(updatedProduct.data);
      setUserRated(true);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        {product && (
          <div className="product-div">
            <div className="product-div-left">
              <div className="img-container">
                <img src={`http://localhost:4000${product.photos[0]}`} alt="watch" />
              </div>
            </div>
            <div className="product-div-right">
              {/* Existing content... */}
              <span className="product-name">{product.name}</span>
              <p>{product.desc}</p>
              <span className="product-price">$ {product.price}</span>
              <div className="product-rating">
                {product.rating} ratings
              </div>
              <p className="product-description">{product.description}</p>
              <div className="btn-groups">
                {/* Existing buttons... */}
              </div>
            </div>
          </div>
        )}

<div className="rating-section">
            <h2>Rating</h2>
            {userRated ? (
              <p>You have already rated this product</p>
            ) : (
              <>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                />
                <p>Selected Rating: {rating}</p>
                <button onClick={handleAddRating}>Add Rating</button>
              </>
            )}
          </div>

        {/* Render the comments section */}
        <CommentsSection
          productId={productId}
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          setComments={setComments}
        />
      </div>
    </div>
  );
};
