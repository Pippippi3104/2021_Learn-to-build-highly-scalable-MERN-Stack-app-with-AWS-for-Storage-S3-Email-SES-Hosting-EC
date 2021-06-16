import withAdmin from "../withAdmin";

import Layout from "../../components/Layout";

const Admin = ({ user }) => <Layout>{JSON.stringify(user)}</Layout>;

export default withAdmin(Admin);
