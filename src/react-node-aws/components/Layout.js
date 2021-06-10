import React from "react";

const Layout = ({ children }) => {
	const nav = () => (
		<ul className="nav">
			<li className="nav-item">
				<a className="nav-link" href="">
					Home
				</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="">
					Login
				</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="">
					Register
				</a>
			</li>
		</ul>
	);
	return (
		<React.Fragment>
			{nav()}

			{/* import 先にて、 Layout タグで囲んだ中の要素が入る */}
			{children}
		</React.Fragment>
	);
};

export default Layout;
