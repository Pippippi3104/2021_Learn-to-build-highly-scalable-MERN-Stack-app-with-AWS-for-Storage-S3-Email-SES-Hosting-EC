import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Routers(indicator)
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

// Main Screen Compoent
const Layout = ({ children }) => {
	// componets
	const head = () => (
		<React.Fragment>
			{/* bootstrap */}
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
				integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
				crossorigin="anonymous"
			/>
			{/* cdnjs (Routers が適応される) */}
			<link rel="stylesheet" href="/static/css/styles.css" />
		</React.Fragment>
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

	// Main Screen
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
