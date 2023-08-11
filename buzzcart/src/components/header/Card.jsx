import React, { useState } from "react"
import { BiShoppingBag } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { product } from "../../assets/data/data"
import { CartItems } from "./CartItems"
import { useSelector,useDispatch  } from "react-redux"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; //
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice"



export const Card = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [cardOpen, setCardOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeCard = () => {
    setCardOpen(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const quantity = useSelector((state) => state.cart.totalQuantity);
  let cartItems = useSelector((state) => state.cart.itemsList); // Use 'let' to modify the cartItems

  let total = 0;
  cartItems.forEach((item) => {
    total += item.totalPrice;
  });

  const handleOrder = async () => {
    const orderDetails = {
      userId: window.localStorage.getItem("userid"),
      cartItems: cartItems.map((item) => ({
        productId: item.id, // Assuming 'id' is the product ID
        quantity: item.quantity,
      })),
      location: document.getElementById("location").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/order/createOrder",
        orderDetails,
        config
      );
      window.alert(response.data.message);
      alert("Successfully ordered");
      navigate("/"); // Redirect to home page after successful order


      cartItems.forEach((item) => {
        dispatch(cartActions.removeFromCart(item.id))
      });
     
      

      // Clear the cartItems array
      cartItems = [];
    } catch (error) {
      console.log(error);
    }
  };

  // Generate unique IDs for cart items
  const cartItemsWithUniqueIds = cartItems.map((item) => ({
    ...item,
    id: uuidv4(), // Generate a unique ID for each cart item
  }));
  return (
    <>
        <div className="card" onClick={() => setCardOpen(!cardOpen)}>
        <BiShoppingBag className="cardIcon" />
        <span className="flexCenter">{quantity}</span>
      </div>
      <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cardOpen ? "cartItem" : "cardhide"}>
        <div className="title flex">
          <h2>Shopping Cart</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className="icon" />
          </button>
        </div>
        {cartItems.map((item) => (
          item && (
            <CartItems
              key={item.id} // Assuming 'id' is a unique identifier for the cart item
              cover={item.cover}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
            />
          )
        ))}
        <div className="checkOut">
          <button onClick={openModal}>
            <span>Proceed To Checkout</span>
            <label htmlFor="">{`$${total}`}</label>
          </button>
        </div>
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showModal ? "block" : "none" }}
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Verify Order</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Location:</label>
                <input type="text" className="form-control" id="location" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone:</label>
                <input type="text" className="form-control" id="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleOrder}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
