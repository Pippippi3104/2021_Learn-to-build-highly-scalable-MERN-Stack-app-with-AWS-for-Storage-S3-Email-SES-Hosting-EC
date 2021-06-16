import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";

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
const User = ({ user }) => <Layout>{JSON.stringify(user)}</Layout>;

// fetch
User.getInitialProps = async (context) => {
	const token = getCookie("token", context.req);

	try {
		const response = await axios.get(`${API}/user`, {
			headers: {
				authorization: `Bearer ${token}`,
				contentType: "application/json",
			},
		});
		return { user: response.data };
	} catch (error) {
		if (error.response.status === 401) {
			return { user: "no user" };
		}
	}
};

export default User;
