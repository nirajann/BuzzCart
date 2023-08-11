import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/buzzcart.png";
import "./header.css"; // Import your header styles
import { AiOutlineSearch } from "react-icons/ai";
import { Card } from "./Card";
import { User } from "./User";
import { useNavigate } from "react-router-dom";

export const Header = ({ products, setSearchResults }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  let logoutTimer;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    logoutTimer = setTimeout(() => {
    localStorage.clear();
    navigate('/');
      console.log('User automatically logged out after 2 minutes');
    }, 6 * 60 * 1000); // 2 minutes in milliseconds

    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts([]); // Clear the filtered products if search bar is empty
      setShowSearchResults(false); // Hide search results popup
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filteredProducts);
    setSearchResults(filteredProducts); // Update search results using prop
    setShowSearchResults(true); // Show search results popup
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <>
      <header className="header">
        <div className="scontainer flex">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Buzzcar" height={30} width={50} />
            </Link>
            <h3 className="text-dark fw-bold">
              <span className="text-warning fw-bold">Buzz</span>
              <span className="me-1">Cart</span>
            </h3>
          </div>
          <div className="search flex">
            <AiOutlineSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="account flexCenter">
            <Link
              className="nav-link active ms-4 fs-5 px-4 ml-1"
              to="/Product"
              activeClassName="active-link"
            >
              Products
            </Link>
            <Card />
            {token !== null ? (
              <User handleLogout={handleLogout} />
            ) : (
              <Link
                to="/login"
                className="btn btn-warning ms-4 fw-bold fs-8"
                type="button"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {showSearchResults && filteredProducts.length > 0 && (
        <div className="search-popup">
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/productDetail/${product.id}`} onClick={closeSearchResults}>
                  <div className="popup-item">
                    <img
                      src={`http://localhost:4000${product.photos[0]}`}
                      alt={product.name}
                      className="popup-image"
                    />
                    <p className="popup-product-name">{product.name}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
