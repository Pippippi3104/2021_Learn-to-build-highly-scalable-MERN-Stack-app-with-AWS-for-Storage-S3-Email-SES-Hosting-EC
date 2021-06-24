import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/alerts";

const Update = ({ oldCategory, token }) => {
	// state
	const [state, setState] = useState({
		name: oldCategory.name,
		error: "",
		success: "",
		buttonText: "Update",
		imagePreview: oldCategory.image.url,
		image: "",
	});
	const [content, setContent] = useState(oldCategory.content);
	const [imageUploadButtonName, setImageUploadButtonName] =
		useState("Update image");
	const { name, success, error, image, buttonText, imagePreview } = state;

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
		setState({ ...state, buttonText: "Updating" });

		//
		try {
			const response = await axios.put(
				`${API}/category/${oldCategory.slug}`,
				{ name, content, image },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("CATEGORY UPDATE RESPONSE", response);
			setState({
				...state,
				imagePreview: response.data.image.url,
				success: `${response.data.name} is updated`,
			});
			setContent(response.data.content);
		} catch (error) {
			console.log("CATEGORY UPDATE RESPONSE", error);
			setState({
				...state,
				buttonText: "Update",
				error: error.response.data.error,
			});
		}
	};

	// components
	const updateCategoryForm = () => (
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
					{` `}
					<span>
						<img src={imagePreview} alt="image" height="20" />
					</span>
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
					<h1>Update category</h1>
					<br />

					{/* msg */}
					{success && showSuccessMessage(success)}
					{error && showErrorMessage(error)}

					{/* forms */}
					{updateCategoryForm()}
				</div>
			</div>
		</Layout>
	);
};

// fetch
Update.getInitialProps = async ({ req, query, token }) => {
	const response = await axios.post(`${API}/category/${query.slug}`);
	return { oldCategory: response.data.category, token };
};

export default withAdmin(Update);
