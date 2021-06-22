import axios from "axios";
import { useState } from "react";

import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/alerts";

const Create = ({ user, token }) => {
	// state
	const [state, setState] = useState({
		name: "",
		content: "",
		error: "",
		success: "",
		formData: process.browser && new FormData(),
		buttonText: "Create",
		imageUploadText: "Upload image",
	});
	const {
		name,
		content,
		success,
		error,
		formData,
		buttonText,
		imageUploadText,
	} = state;

	// function
	const handleChange = (name) => (e) => {
		const value = name === "image" ? e.target.files[0] : e.target.value;
		const imageName =
			name === "image" ? e.target.files[0].name : "Upload image";
		formData.set(name, value);

		setState({
			...state,
			[name]: value,
			error: "",
			success: "",
			imageUploadText: imageName,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setState({ ...state, buttonText: "Creating" });

		//
		try {
			const response = await axios.post(`${API}/category`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("CATEGORY CREATE RESPONSE", response);
			setState({
				...state,
				name: "",
				content: "",
				formData: "",
				buttonText: "Created",
				imageUploadText: "Upload image",
				success: `${response.data.name} is created`,
			});
		} catch (error) {
			console.log("CATEGORY CREATE RESPONSE", error);
			setState({
				...state,
				name: "",
				buttonText: "Create",
				error: error.response.data.error,
			});
		}
	};

	// components
	const createCategoryForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					value={name}
					type="text"
					className="form-control"
					required
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Content</label>
				<textarea
					onChange={handleChange("content")}
					value={content}
					type="text"
					className="form-control"
					required
				/>
			</div>
			<div className="form-group">
				<label className="btn btn-outline-secondary">
					{imageUploadText}
					<input
						onChange={handleChange("image")}
						type="file"
						accept="image/*"
						className="form-control"
						hidden
					/>
				</label>
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
					<h1>Create category</h1>
					<br />

					{/* msg */}
					{success && showSuccessMessage(success)}
					{error && showErrorMessage(error)}

					{/* forms */}
					{createCategoryForm()}
				</div>
			</div>
		</Layout>
	);
};

export default withAdmin(Create);
