import Layout from "../../components/Layout";
import Link from "next/link";

import withAdmin from "../withAdmin";

const Admin = ({ user }) => (
	<Layout>
		<h1>Admin Dashboard</h1>
		<br />
		<div className="row">
			<div className="col-md-4">
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link href="/admin/category/create">
							<a className="nav-link">Create category</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/category/read">
							<a className="nav-link">Categories</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/link/read">
							<a className="nav-link">All links</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className="col-md-8"></div>
		</div>
	</Layout>
);

export default withAdmin(Admin);
