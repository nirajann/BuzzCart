import React, { useState, useEffect } from "react";
import axios from 'axios';
import image from "../../assets/images/input.png";
import "./account.css";
import { useNavigate, useParams } from "react-router-dom";

export const Account = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
      .then((res) => {
        setUsers(res.data);
        setOriginalUsername(res.data.username);
        setOriginalEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteOrder = (orderId) => {
    setUsers(users.filter((user) => user._id !== orderId));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append("pic", file);
  
      try {
        const response = await axios.put(
          `http://localhost:4000/users/${window.localStorage.getItem('userid')}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Image uploaded successfully:", response.data);
  
        // Update the user's profile picture in the state
        setUsers(prevUsers => prevUsers.map(user => {
          if (user._id === response.data._id) {
            return { ...user, pic: response.data.pic };
          }
          return user;
        }));
  
        setIsImageChanged(true);
  
        // Show success modal
        setShowSuccessModal(true);
      } catch (error) {
        console.log("Image upload failed:", error);
        // Handle the error, if needed
      }
    } else {
      console.log("No file selected for upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`, {
        username: isUsernameChanged ? username : originalUsername,
        email: isEmailChanged ? email : originalEmail,
      });

      if (isUsernameChanged) {
        setUsername(response.data.username);
      }

      setIsUsernameChanged(false);
      setIsEmailChanged(false);

      navigate("/account");

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='accountInfo'>
      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <h2 style={{ color: "green" }}>Changes Saved</h2>
            {isUsernameChanged && <p>Username has been updated.</p>}
            {isEmailChanged && <p>Email has been updated.</p>}
            <button onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
      
      {users && users.map((user) => (
        <div className='container boxItems' key={user._id}>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
              <div className="profile-img-container">
                    <img src={user.pic ? `http://localhost:4000/${user.pic.replace('\\', '/')}` : ""} className="card-img-top" alt="Profile" />
                  </div>
                <input
                  type='file'
                  accept='image/*'
                  src={
                    user.pic
                      ? `http://localhost:4000/${user.pic.replace("\\", "/")}`
                      : image
                  }
                  alt='imgs'
                  onChange={handleImageUpload}
                />
                <img
                  src={
                    user.pic
                      ? `http://localhost:4000/${user.pic.replace("\\", "/")}`
                      : image
                  }
                  alt=''
                  className='image-preview'
                />
              </div>
            </div>
            <div className='right'>
              <label>Username</label>
              <input
                type='text'
                defaultValue={user.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUsernameChanged(e.target.value !== originalUsername);
                }}
                required
              />
              <label>Email</label>
              <input
                type='text'
                defaultValue={user.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailChanged(e.target.value !== originalEmail);
                }}
                required
              />
              <label>Password *</label>
              <input type='password' defaultValue={"********"} required />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
