import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";

import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";

const Login = () => {
	// state
	const [state, setState] = useState({
		email: "origamistfrancais@gmail.com",
		password: "testtest",
		error: "",
		success: "",
		buttonText: "Login",
	});
	const { email, password, error, success, buttonText } = state;

	// functions
	const handleChange = (name) => (e) => {
		setState({
			...state,
			[name]: e.target.value,
			error: "",
			success: "",
			buttonText: "Login",
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		// send の pending
		setState({ ...state, buttonText: "Logging in" });

		// serverへデータを送信
		try {
			// API の実行 (server 側で構築済み)
			const response = await axios.post(`${API}/login`, {
				email,
				password,
			});
			console.log(response);
		} catch (error) {
			console.log(error);
			setState({
				...state,
				buttonText: "Login",
				error: error.response.data.error, // server の auth controller にてメッセージが追加されている
			});
		}
	};

	// components
	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					value={email}
					onChange={handleChange("email")}
					type="email"
					className="form-control"
					placeholder="Type your email"
					required
				/>
			</div>
			<div className="form-group">
				<input
					value={password}
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					placeholder="Type your password"
					required
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
				<h1>Login</h1>
				<br />

				{/* alert message */}
				{success && showSuccessMessage(success)}
				{error && showErrorMessage(error)}

				{/* forms */}
				{loginForm()}
			</div>
		</Layout>
	);
};

export default Login;
