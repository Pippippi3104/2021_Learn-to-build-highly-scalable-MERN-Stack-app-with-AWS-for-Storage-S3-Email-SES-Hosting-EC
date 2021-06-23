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

	// screen
	return (
		<Layout>
			<div>
				<div>
					<h1>Submit Link / URL</h1>
					<br />
					{JSON.stringify(loadedCategories)}
				</div>
			</div>
		</Layout>
	);
};

export default Create;
