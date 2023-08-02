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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Replace ':id' with the actual product ID to fetch the specific product
        const response = await axios.get(`http://localhost:4000/product/${productId}`, config);

        // Assuming the response.data contains the fetched product data
        setProduct(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    // Check if productId exists before making the API request
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Assuming the product rating is obtained from the fetched product data
  const productRating = product ? product.rating : 0;

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Retrieve the userId from localStorage
        const userId = localStorage.getItem(`userid`);
        
        // Check if userId is available
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
  
        const response = await axios.post(`http://localhost:4000/product/${productId}/addcomment`, {
          userId,
          text: newComment,
        });
  
        setComments([...comments, response.data.comment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  

  const handleAddRating = async (value) => {
    const userId = localStorage.getItem('userId');
    try {
        // Call the API to add a rating
        await axios.post(`http://localhost:4000/product/${productId}/addreview`, {
          userId,
          value: rating,
        });
    
        // Fetch the updated product data
        const response = await axios.get(`http://localhost:4000/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error adding rating:", error);
      }
  };

  const renderStarIcons = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (halfStars > 0) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    for (let i = 0; i < totalStars - fullStars - halfStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  // ... Existing code

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
              <span className="product-price">$ {product.price}</span>
              <div className="product-rating">
                {renderStarIcons(productRating)}
                <span>({productRating} ratings)</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="btn-groups">
                {/* Existing buttons... */}
              </div>
            </div>
          </div>
        )}

        {/* Render the rating section */}
        <div className="rating-section">
          <h2>Rating</h2>
          <div className="star-icons">{renderStarIcons(productRating)}</div>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
          />
          <button onClick={() => handleAddRating(rating)}>Add Rating</button>
        </div>

        {/* Render the comments section */}
        <CommentsSection
           productId={productId}
           handleAddComment={handleAddComment}
           comments={comments}
           newComment={newComment}
           setNewComment={setNewComment}
           setComments={setComments}
        />
      </div>
    </div>
  );
};
