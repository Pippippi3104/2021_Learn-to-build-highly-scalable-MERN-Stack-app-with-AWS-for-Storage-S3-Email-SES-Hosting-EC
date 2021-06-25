import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { isAuth } from "../helpers/auth";

const Register = () => {
	// state
	const [state, setState] = useState({
		name: "test_user",
		email: "origamistfrancais@gmail.com",
		password: "testtest",
		error: "",
		success: "",
		buttonText: "Register",
		loadedCategories: [],
		categories: [],
	});

	// state
	const {
		name,
		email,
		password,
		error,
		success,
		buttonText,
		loadedCategories,
		categories,
	} = state;

	//fetch
	useEffect(() => {
		loadCategories();
	}, []);

	// ログイン済みか確認
	useEffect(() => {
		isAuth() && Router.push("/");
	}, []);

	// functions
	const loadCategories = async () => {
		const response = await axios.get(`${API}/categories`);
		setState({ ...state, loadedCategories: response.data });
	};

	const handleChange = (name) => (e) => {
		setState({
			...state,
			[name]: e.target.value,
			error: "",
			success: "",
			buttonText: "Regiser",
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.table({
			name,
			email,
			password,
			categories,
		});

		// send の pending
		setState({ ...state, buttonText: "Registering" });

		// serverへデータを送信
		try {
			// API の実行 (server 側で構築済み)
			const response = await axios.post(`${API}/register`, {
				name,
				email,
				password,
				categories,
			});
			console.log(response);
			setState({
				...state,
				name: "",
				email: "",
				password: "",
				buttonText: "Submitted",
				success: response.data.message, // server の auth controller にてメッセージが追加されている
			});
		} catch (error) {
			console.log(error);
			setState({
				...state,
				buttonText: "Register",
				error: error.response.data.error, // server の auth controller にてメッセージが追加されている
			});
		}
	};

	const handleToggle = (c) => () => {
		// return the first index or -1
		const clickedCategory = categories.indexOf(c);
		const all = [...categories];

		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		console.log("all >> categories", all);
		setState({ ...state, categories: all, success: "", error: "" });
	};

	// show categories > check
	const showCategories = () => {
		return (
			loadedCategories &&
			loadedCategories.map((c, i) => (
				<li className="list-unstyled" key={c._id}>
					<input
						type="checkbox"
						onChange={handleToggle(c._id)}
						className="mr-2"
					/>
					<label className="form-check-label">{`_${c.name}`}</label>
				</li>
			))
		);
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
					required
				/>
			</div>
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
				<label className="text-muted ml-4">Category</label>
				<ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
					{showCategories()}
				</ul>
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
