import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../../components/Layout";
import { API } from "../../../config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";

const Create = () => {
	// state
	const [state, setState] = useState({
		title: "",
		url: "",
		categories: [],
		loadedCategories: [],
		success: "",
		error: "",
		type: "",
		medium: "",
	});
	const {
		title,
		url,
		categories,
		loadedCategories,
		success,
		error,
		type,
		medium,
	} = state;

	//fetch
	useEffect(() => {
		fetchLoadedCategories();
	}, [success]);

	// functions
	const fetchLoadedCategories = async () => {
		const response = await axios.get(`${API}/categories`);
		setState({ ...state, loadedCategories: response.data });
	};

	const handleSubmit = async () => {
		console.log("POST to server");
	};

	const handleTitleChange = (e) => {
		setState({ ...state, title: e.target.value, error: "", success: "" });
	};

	const handleURLChange = (e) => {
		setState({ ...state, url: e.target.value, error: "", success: "" });
	};

	// link create form
	const submitLinkForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted">Title</label>
				<input
					type="text"
					className="form-control"
					onChange={handleTitleChange}
					value={title}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">URL</label>
				<input
					type="url"
					className="form-control"
					onChange={handleURLChange}
					value={url}
				/>
			</div>
			<div>
				<button class="btn btn-outline-warning" type="submit">
					Submit
				</button>
			</div>
		</form>
	);

	// screen
	return (
		<Layout>
			<div className="row">
				<div className="col-md-12">
					<h1>Submit Link / URL</h1>
					<br />
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">xxx</div>
				<div className="col-md-8">{submitLinkForm()}</div>
			</div>
		</Layout>
	);
};

export default Create;
