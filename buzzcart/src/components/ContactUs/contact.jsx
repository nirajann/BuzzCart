import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    Fullname: '',
    Email: '',
    Address: '',
    Description: '',
  });
  const navigate = useNavigate();

  const handleContact = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/contact/createcontact', formData)
      .then(() => {
        alert('Your message has been sent successfully.');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section id="contact-form" className="contact-section">
      <div className="container contact-container">
        <div className="row">
          <div className="col-md-6">
            <div className="contact-card">
              <h1 className="text-center contact-heading">Contact Us</h1>
              <form onSubmit={handleContact} autoComplete="off">
                <div className="mb-3 d-flex">
                  <div className="flex-grow-1 me-2">
                    <input
                      type="text"
                      className="form-control contact-input"
                      name="Fullname"
                      placeholder="Full Name"
                      value={formData.Fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <input
                      type="email"
                      className="form-control contact-input"
                      name="Email"
                      placeholder="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control contact-input"
                    name="Address"
                    placeholder="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control contact-input"
                    name="Description"
                    placeholder="Description"
                    rows="5"
                    value={formData.Description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="btn contact-button">
                  Contact Us
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-image-container">
              <img
                src="https://imgs.search.brave.com/HjQlAubVV1AC6EeT1iTY_DLnqr5XYxP6SOdJMpkOkYU/rs:fit:1090:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/X0YxSkxDX0VTSldf/TFhacjREQzBRSGFE/TyZwaWQ9QXBp"
                alt="Contact"
                className="img-fluid contact-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
