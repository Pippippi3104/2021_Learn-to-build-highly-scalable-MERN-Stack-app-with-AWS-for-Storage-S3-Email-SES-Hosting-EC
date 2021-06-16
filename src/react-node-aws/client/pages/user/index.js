import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

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
const User = ({ todos }) => <Layout>{JSON.stringify(todos)}</Layout>;

// fetch
User.getInitialProps = async () => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/todos"
	);
	console.log("SERVER RENDERED", response);

	return {
		todos: response.data,
	};
};

export default User;
