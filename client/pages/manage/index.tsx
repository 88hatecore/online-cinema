import { NextPageAuth } from "@/shared/types/auth.types";

const AdminPage: NextPageAuth = () => {
	return <div>AdminPage</div>;
};

AdminPage.isOnlyAdmin = true;

export default AdminPage;
