import React from "react";
import { Link } from "react-router-dom";

import "./Help.css"; // Import your custom CSS for this page

export const Help = () => {
  return (
    <div className="help-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-4">Need Help?</h1>
            <p className="text-center">
              If you have any questions or need assistance, please don't hesitate to contact our customer support team. We're here to help you!
            </p>
            <div className="text-center mt-4">
              <Link to="/Contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
