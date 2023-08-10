import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import userService from '../../services/loginService';
import styles from "./styles.module.css";


export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
  
	const navigate = useNavigate();
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
  
	  userService.login({ username, password })
		.then((res) => {
		  localStorage.setItem('token', res.data.token);
		  localStorage.setItem('userid', res.data.userId);
		  localStorage.setItem('username', username);
		  localStorage.setItem('admin', res.data.isAdmin);
  
		  if (res.data.isAdmin === 'true' && res.data.token !== null) {
			navigate('/AdminPanel');
		  } else {
			navigate('/Product');
		  }

		  
		})
		.catch((err) => {
		  setErrorMessage('Incorrect username or password');
		});
	};
  
	useEffect(() => {
	  // Check session expiration and handle logout if necessary
	  const sessionExpirationTime = localStorage.getItem('sessionExpirationTime');
	  if (sessionExpirationTime && Date.now() > sessionExpirationTime) {
		// Clear local storage and log user out
		localStorage.clear();
	  }
	}, []);
  
	useEffect(() => {
	  // Update session expiration time upon successful login
	  if (localStorage.getItem('token')) {
		const sessionExpirationTime = Date.now() + 120000; // 2 minutes
		localStorage.setItem('sessionExpirationTime', sessionExpirationTime);
	  }
	}, [username]);
  
	return (
	  <div className={styles.login_container}>
		<div className={styles.login_form_container}>
		  <div className={styles.left}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
			  <h1>Login</h1>
			  <input
				type="text"
				placeholder="Username"
				name="Username"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				required
				className={styles.input}
			  />
			  <input
				type="password"
				placeholder="Password"
				name="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				required
				className={styles.input}
			  />
			  <div id="login-message" className={`message ${errorMessage ? 'failure' : ''}`}>
				{errorMessage}
			  </div>
			  <button type="submit" className={styles.green_btn}>
				Sign In
			  </button>
			</form>
		  </div>
		  <div className={styles.right}>
			<h1>New Here?</h1>
			<Link to="/signup">
			  <button type="button" className={styles.white_btn}>
				Sign Up
			  </button>
			</Link>
		  </div>
		</div>
	  </div>
	);
  };
  

  