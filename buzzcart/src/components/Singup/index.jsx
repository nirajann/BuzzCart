import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export  const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Validate if passwords match
    const passwordsMatch = password === confirmPassword;
    setIsPasswordValid(passwordsMatch);

    // Password requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-/\\]/.test(password);

    const meetsRequirements =
      password.length >= 8 &&
      password.length <= 12 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars &&
      !password.toLowerCase().includes(username) &&
      !password.includes("123456") &&
      !password.includes("password");

    setIsPasswordValid(meetsRequirements);

    if (!passwordsMatch) {
      setMessage("Passwords don't match");
      setValid(false);
    } else if (!meetsRequirements) {
      setMessage("Please follow password requirements: 8-12 characters, uppercase, lowercase, numbers, and special characters.");
      setValid(false);
    } else {
      setMessage("");
      setValid(true);
    }
  }, [confirmPassword, password, username]);

  const handleRegister = () => {
    if (!valid) {
      setMessage("Please fix password issues.");
      return;
    }

    if (password === "" || confirmPassword === "") {
      setMessage("Please enter a password and confirm it.");
      return;
    }

    axios
      .post("http://localhost:4000/auth/registeruser", {
        username,
        password,
        email,
      })
      .then((response) => {
        const { _id, username, email, pic } = response.data;
        setMessage("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.join(", ");
          setMessage(`Invalid user data: ${errorMessages}`);
        } else {
          setMessage("Registration failed. Please try again later.");
        }
        console.log("Error:", error);
      });
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Sign Up</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              className={styles.input}
            />
            <div>
              {message && (
                <div className={`alert ${valid ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  {message}
                </div>
              )}
            </div>
            <button type="submit" className={`${styles.green_btn} ${valid ? '' : styles.disabled}`} disabled={!valid}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


