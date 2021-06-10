import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
	// コンポーネント
	const head = () => (
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
			integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
			crossorigin="anonymous"
		/>
	);
	const nav = () => (
		<ul className="nav nav-tabs bg-warning">
			<li className="nav-item">
				<Link href="/">
					<a className="nav-link text-dark">Home</a>
				</Link>
			</li>
			<li className="nav-item">
				<Link href="/login">
					<a className="nav-link text-dark">Login</a>
				</Link>
			</li>
			<li className="nav-item">
				<Link href="/register">
					<a className="nav-link text-dark">Register</a>
				</Link>
			</li>
		</ul>
	);

	// メインスクリーン
	return (
		<React.Fragment>
			{head()}
			{nav()}

			{/* import 先にて、 Layout タグで囲んだ中の要素が入る */}
			<div className="container pt-5 pb-5">{children}</div>
		</React.Fragment>
	);
};

export default Layout;
