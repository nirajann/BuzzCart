import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const close = () => {
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
      .then((res) => {
        setUsers(res.data);
        setOriginalUsername(res.data.username);
        setOriginalEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutHandler = (e) => {
    dispatch(authActions.logout());
  };

  return (
    <>
     {users && users.map((user) => (
      <div className='profile'>
        <>
          <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
            <img src={user.pic
                      ? `http://localhost:4000/${user.pic.replace("\\", "/")}`: ""} alt='' />
          </button>
          {profileOpen && (
               
            <div className='openProfile boxItems' onClick={close}>
              <div className='image'>
                <Link to='/account'>
                  <div className='img'>
                    <img src={user.pic
                      ? `http://localhost:4000/${user.pic.replace("\\", "/")}` : ""} alt='' />
                  </div>
                </Link>
                <div className='text'>
                  <h4>{user.username}</h4>
                  <label htmlFor=''>{user.email}</label>
                </div>
              </div>
              <Link to='/account'>
                <button className='box'>
                  <IoSettingsOutline className='icon' />
                  <h4>My Account</h4>
                </button>
              </Link>
              <button className='box'>
                <BsBagCheck className='icon' />
                <h4>My Order</h4>
              </button>
              <button className='box'>
                <AiOutlineHeart className='icon' />
                <h4>Wishlist</h4>
              </button>
              <button className='box'>
                <GrHelp className='icon' />
                <h4>Help</h4>
              </button>
              <button className='box' onClick={handleLogout}>
                <BiLogOut className='icon' />
                <h4>Log Out</h4>
              </button>
            </div>
          )}
        </>
      </div>
         ))}
    </>
  );
};
