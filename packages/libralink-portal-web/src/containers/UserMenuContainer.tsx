import UserMenuView from "views/UserMenuView";
import useLogin from "../hooks/useLogin";

const UserMenuContainer = () => {
  const { logout } = useLogin();

  const handleLogout = () => {
    logout();
  };

  return <UserMenuView onLogout={handleLogout} />;
};

export default UserMenuContainer;
