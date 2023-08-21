import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const authorization = {
  employee: {
    admin: ["read"],
    Admin: ["create_staff", "create_dean", "delete", "read", "update"],
    Dean: ["create_staff", "delete", "read", "update"],
  },
  faculity: {
    Admin: ["read", "create", "update", "delete"],
    Dean: ["read"],
  },
  request: {
    Staff: ["read", "create", "update", "delete"],
    Dean: ["read", "create", "response", "delete"],
    Maintenance: ["read", "assign"],
  },
  department: {
    Admin: ["read", "create", "update", "delete"],
    Dean: ["read"],
  },
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

const useAuthorization = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    if (isEmpty(user)) {
      navigate("/login");
    }
  };

  const checkAccess = (url, access) => {
    return (
      authorization[url] &&
      authorization[url][user.role] &&
      authorization[url][user.role].includes(access)
    );
  };

  isLoggedIn();

  return { checkAccess };
};

export default useAuthorization;
