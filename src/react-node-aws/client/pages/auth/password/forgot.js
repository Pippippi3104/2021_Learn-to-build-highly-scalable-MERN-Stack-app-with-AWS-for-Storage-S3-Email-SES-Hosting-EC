import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { withRouter } from "next/router";

import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { API } from "../../../config";
import Layout from "../../../components/Layout";

//
const ForgotPassword = () => {
	// state
	const [state, setState] = useState({
		email: "origamistfrancais@gmail.com",
		buttonText: "Forgot Account",
		success: "",
		error: "",
	});
	const { email, buttonText, success, error } = state;

	// functions
	const handleChange = (e) => {
		setState({ ...state, email: e.target.value, success: "", error: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`${API}/forgot-password`, { email });
			setState({
				...state,
				email: "",
				buttonText: "Done",
				success: response.data.message,
			});
		} catch (error) {
			console.log("FORGOT PW ERROR", error);
			setState({
				...state,
				buttonText: "Forgot Password",
				error: error.response.data.error,
			});
		}
	};

	// screen component
	const passwordForgotForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					onChange={handleChange}
					value={email}
					placeholder="Type your email"
					required
				/>
			</div>
			<div>
				<button className="btn btn-outline-warning">{buttonText}</button>
			</div>
		</form>
	);

	// screen
	return (
		<Layout>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h1>Forgot password</h1>
					<br />

					{/* messages */}
					{success && showSuccessMessage(success)}
					{error && showErrorMessage(error)}

					{/* form */}
					{passwordForgotForm()}
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
