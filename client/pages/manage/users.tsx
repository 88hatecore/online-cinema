import UserList from "@/components/screens/users/UserList";

import { NextPageAuth } from "@/shared/types/auth.types";

const UserListPage: NextPageAuth = () => {
	return <UserList></UserList>;
};

UserListPage.isOnlyAdmin = true;

export default UserListPage;
