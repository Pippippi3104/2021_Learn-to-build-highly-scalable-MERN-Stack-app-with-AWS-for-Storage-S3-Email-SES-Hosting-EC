import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/alerts";

const Create = ({ user, token }) => {
	// state
	const [state, setState] = useState({
		name: "",
		error: "",
		success: "",
		buttonText: "Create",
		image: "",
	});
	const [content, setContent] = useState("");
	const [imageUploadButtonName, setImageUploadButtonName] =
		useState("Upload image");
	const { name, success, error, image, buttonText } = state;

	// function
	const handleChange = (name) => (e) => {
		setState({ ...state, [name]: e.target.value, error: "", success: "" });
	};

	const handleContent = (e) => {
		setContent(e.target.value);
		setState({ ...state, success: "", error: "" });
	};

	const handleImage = (e) => {
		let fileInput = false;
		if (e.target.files[0]) {
			fileInput = true;
		}

		setImageUploadButtonName(e.target.files[0].name);

		if (fileInput) {
			try {
				Resizer.imageFileResizer(
					e.target.files[0],
					300,
					300,
					"JPEG",
					100,
					0,
					(uri) => {
						setState({ ...state, image: uri, success: "", error: "" });
					},
					"base64",
					200,
					200
				);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setState({ ...state, buttonText: "Creating" });

		//
		try {
			const response = await axios.post(
				`${API}/category`,
				{ name, content, image },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("CATEGORY CREATE RESPONSE", response);
			setImageUploadButtonName("Upload image");
			setContent("");
			setState({
				...state,
				name: "",
				formData: "",
				buttonText: "Created",
				imageUploadText: "Upload image",
				success: `${response.data.name} is created`,
			});
		} catch (error) {
			console.log("CATEGORY CREATE RESPONSE", error);
			setState({
				...state,
				// name: "",
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
					onChange={handleContent}
					value={content}
					type="text"
					className="form-control"
					required
				/>
			</div>
			<div className="form-group">
				<label className="btn btn-outline-secondary">
					{imageUploadButtonName}
					<input
						onChange={handleImage}
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
