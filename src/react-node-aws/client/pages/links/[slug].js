import Link from "next/link";
import axios from "axios";

import Layout from "../../components/Layout";
import { API } from "../../config";

const Links = ({
	query,
	category,
	links,
	totalLinks,
	linksLimit,
	linkSkip,
}) => {
	// screen
	return (
		<Layout>
			<div className="row">
				<div className="col-md-8">{JSON.stringify(category)}</div>
				<div className="col-md-4">right sidebar</div>
			</div>
		</Layout>
	);
};

// fetch
Links.getInitialProps = async ({ query, req }) => {
	let skip = 0;
	let limit = 2;

	const response = await axios.post(`${API}/category/${query.slug}`, {
		skip,
		limit,
	});

	return {
		query,
		category: response.data.category,
		links: response.data.links,
		totalLinks: response.data.links.length,
		linksLimit: limit,
		linkSkip: skip,
	};
};

export default Links;
