import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [valid, setValid] = useState("");
	const navigate = useNavigate();
	let matched = false;

	useEffect(() => {
		if (password === "" || confirmPassword === "") {


		} else if (password !== confirmPassword) {
			matched = false;
			setMessage("Passwords don't match");
			setValid("is-invalid");
		} else {
			matched = true;
			setMessage("Passwords match");
			setValid("is-valid");
		}
	}, [confirmPassword, password]);

	const handleRegister = () => {
		axios
			.post("http://localhost:4000/auth/registeruser", {
				username,
				password,
				email,
			})
			.then((response) => {
				const { _id, username, email, pic } = response.data;
				console.log("Successful:", response.data);
				setMessage("Registration successful");
				setValid("is-valid");
				navigate("/login");
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.errors) {
					const errorMessages = error.response.data.errors.join(", ");
					setMessage(`Invalid user data: ${errorMessages}`);
				} else {
					setMessage("Registration failed. Please try again later.");
				}
				setValid("is-invalid");
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
							Sing in
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
							placeholder="confirmPassword"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							className={styles.input}
						/>
						<div>

							{message && (
								<div className={`alert ${matched ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
									{message}
								</div>
							)}
						</div>

						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};


