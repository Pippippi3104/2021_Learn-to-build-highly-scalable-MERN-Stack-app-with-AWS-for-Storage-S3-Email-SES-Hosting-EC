import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { isAuth, logout } from "../helpers/auth";

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
				crossOrigin="anonymous"
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
				<Link href="/user/link/create">
					<a className="btn btn-success" style={{ borderRadius: "5px" }}>
						Submit a link
					</a>
				</Link>
			</li>

			{!isAuth() && (
				<React.Fragment>
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
				</React.Fragment>
			)}

			{isAuth() && isAuth().role === "admin" && (
				<li className="nav-item ml-auto">
					<Link href="/admin">
						<a className="nav-link text-dark">{isAuth().name}</a>
					</Link>
				</li>
			)}
			{isAuth() && isAuth().role === "subscriber" && (
				<li className="nav-item ml-auto">
					<Link href="/user">
						<a className="nav-link text-dark">{isAuth().name}</a>
					</Link>
				</li>
			)}

			{isAuth() && (
				<li className="nav-item">
					<a onClick={logout} className="nav-link text-dark">
						Logout
					</a>
				</li>
			)}
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
