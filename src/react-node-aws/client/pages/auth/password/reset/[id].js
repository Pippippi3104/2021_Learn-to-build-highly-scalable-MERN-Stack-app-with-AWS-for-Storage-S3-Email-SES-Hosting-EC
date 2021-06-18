import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import Router, { withRouter } from "next/router";

import {
	showSuccessMessage,
	showErrorMessage,
} from "../../../../helpers/alerts";
import { API } from "../../../../config";
import Layout from "../../../../components/Layout";

//
const ResetPassword = ({ router }) => {
	// state
	const [state, setState] = useState({
		name: "",
		token: "",
		newPassword: "",
		buttonText: "Forgot Account",
		success: "",
		error: "",
	});
	const { name, token, newPassword, buttonText, success, error } = state;

	// fetch
	useEffect(() => {
		const decoded = jwt.decode(router.query.id);
		if (decoded) {
			setState({ ...state, name: decoded.name, token: router.query.id });
		}
	}, [router]);

	// functions
	const handleChange = (e) => {
		setState({ ...state, newPassword: e.target.value, success: "", error: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// pending
		setState({ ...state, buttonText: "Sending" });

		// reset password
		try {
			const response = await axios.put(`${API}/reset-password`, {
				resetPasswordLink: token,
				newPassword,
			});
			setState({
				...state,
				newPassword: "",
				buttonText: "Done",
				success: response.data.message,
			});
		} catch (error) {
			console.log("RESET PW ERROR", error);
			setState({
				...state,
				buttonText: "Forgot Password",
				error: error.response.data.error,
			});
		}
	};

	// screen component
	const passwordResetForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					onChange={handleChange}
					value={newPassword}
					placeholder="Type new password"
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
					<h1>Hi {name}, Ready to Reset Password?</h1>
					<br />

					{/* messages */}
					{success && showSuccessMessage(success)}
					{error && showErrorMessage(error)}

					{/* form */}
					{passwordResetForm()}
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(ResetPassword);
