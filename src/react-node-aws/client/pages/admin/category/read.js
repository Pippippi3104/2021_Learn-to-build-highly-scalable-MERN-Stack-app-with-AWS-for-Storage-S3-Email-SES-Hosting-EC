import axios from "axios";
import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import Link from "next/link";

import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/alerts";

const Read = ({ user, token }) => {
	// state
	const [state, setState] = useState({
		error: "",
		success: "",
		categories: [],
	});
	const { error, success, categories } = state;

	// fetch
	useEffect(() => {
		loadCategories();
	}, []);

	// functions
	const loadCategories = async () => {
		const response = await axios.get(`${API}/categories`);
		setState({ ...state, categories: response.data });
	};

	const listCategories = () =>
		categories.map((c, i) => (
			<Link href={`/links/${c.slug}`}>
				<a
					style={{ border: "1px solid red" }}
					className="bg-light p-3 col-md-6"
				>
					<div>
						<div className="row">
							<div className="col-md-4">
								<img
									src={c.image && c.image.url}
									alt={c.name}
									style={{ width: "100px", height: "auto" }}
									className="pr-3"
								/>
							</div>
							<div className="col-md-8">
								<h3>{c.name}</h3>
							</div>
						</div>
					</div>
				</a>
			</Link>
		));

	// screen
	return (
		<Layout>
			<div className="row">
				<div className="col">
					<h1>List of categories</h1>
					<br />
				</div>

				<div className="row">{listCategories()}</div>
			</div>
		</Layout>
	);
};

export default withAdmin(Read);
