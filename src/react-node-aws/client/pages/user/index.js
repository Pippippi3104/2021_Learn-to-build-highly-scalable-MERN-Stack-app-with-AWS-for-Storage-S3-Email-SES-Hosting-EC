import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

// useEffect を使った場合
// const User = () => {
// 	const [todos, setTodos] = useState([]);
// 	useEffect(() => {
// 		axios
// 			.get("https://jsonplaceholder.typicode.com/todos")
// 			.then((response) => setTodos(response.data));
// 	}, []);
// 	return <Layout>{JSON.stringify(todos)}</Layout>;
// };

// screen component
const User = ({ user, token, userLinks }) => (
	<Layout>{JSON.stringify(userLinks)}</Layout>
);

export default withUser(User);
