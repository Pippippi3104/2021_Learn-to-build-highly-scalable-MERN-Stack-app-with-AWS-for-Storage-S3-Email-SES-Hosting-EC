import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";

const Register = () => {
	// state
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: "",
		buttonText: "Register",
	});
	const { name, email, password, error, success, buttonText } = state;

	// functions
	const handleChange = (name) => (e) => {
		setState({
			...state,
			[name]: e.target.value,
			error: "",
			success: "",
			buttonText: "Regiser",
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		// send の pending
		setState({ ...state, buttonText: "Registering" });

		// console.table({ name, email, password });
		// serverへデータを送信
		axios
			.post("http://localhost:8000/api/register", {
				name,
				email,
				password,
			})
			.then((response) => {
				console.log(response);
				setState({
					...state,
					name: "",
					email: "",
					password: "",
					buttonText: "Submitted",
					success: response.data.message, // server の auth controller にてメッセージが追加されている
				});
			})
			.catch((error) => {
				console.log(error);
				setState({
					...state,
					buttonText: "Register",
					error: error.response.data.error, // server の auth controller にてメッセージが追加されている
				});
			});
	};

	// components
	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					value={name}
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					placeholder="Type your name"
				/>
			</div>
			<div className="form-group">
				<input
					value={email}
					onChange={handleChange("email")}
					type="email"
					className="form-control"
					placeholder="Type your email"
				/>
			</div>
			<div className="form-group">
				<input
					value={password}
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					placeholder="Type your password"
				/>
			</div>
			<div className="form-group">
				<button className="btn btn-outline-warning">{buttonText}</button>
			</div>
		</form>
	);

	// main screen
	return (
		<Layout>
			{/* main screen components */}
			<div className="col-md-6 offset-md-3">
				<h1>Register</h1>
				<br />

				{/* alert message */}
				{success && showSuccessMessage(success)}
				{error && showErrorMessage(error)}

				{/* forms */}
				{registerForm()}
			</div>
		</Layout>
	);
};

export default Register;
