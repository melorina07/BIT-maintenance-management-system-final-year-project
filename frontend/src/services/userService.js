import useApi from "../utils/api"; //used to make requests to a backend server

const useUserService = () => {
  const { commonApi } = useApi();

  const authUser = () => {
    const response = commonApi.get("authorize/user/");
    return response;
  };

  const getUsers = (departmentId) => {
    const response = commonApi.get("users", {
      params: {
        departmentId,
      },
    });
    return response;
  };

  const deleteUser = (id) => {
    const response = commonApi.delete(`users/${id}`);
    return response;
  };

  const updateUser = (id, user) => {
    const response = commonApi.patch(`users/${id}`, {
      user,
    });
    return response;
  };

  const register = (user) => {
    const response = commonApi.post("registration", {
      ...user,
    });
    return response;
  };

  const login = (user) => {
    const response = commonApi.post("login", {
      ...user,
    });
    return response;
  };

  const logout = () => {
    const response = commonApi.get("logout");
    return response;
  };

  const google = (access_token) => {
    const response = commonApi.post("authorize/google/", {
      access_token,
    });
    return response;
  };
  const github = (code) => {
    const response = commonApi.post("authorize/github/", {
      code,
    });
    return response;
  };
  const resetPassword = (email) => {
    const response = commonApi.post("authorize/password/reset/", {
      email,
    });
    return response;
  };

  const changePassword = (oldPassword, newPassword, confirmPassword) => {
    const response = commonApi.post("change_password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response;
  };

  const activateUser = (userActivation) => {
    const response = commonApi.post(
      `authorize/password/reset/confirm/${userActivation.uid}/${userActivation.token}/`,
      {
        ...userActivation,
      }
    );
    return response;
  };

  return {
    authUser,
    register,
    getUsers,
    login,
    google,
    github,
    resetPassword,
    activateUser,
    deleteUser,
    updateUser,
    changePassword,
    logout,
  };
};

export default useUserService;
