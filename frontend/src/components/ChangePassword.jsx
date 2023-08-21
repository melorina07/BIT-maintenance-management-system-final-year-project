import React, { useState } from "react";
import Logo2 from "../assets/logo2.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUserService from "../services/userService";
import { appURL } from "../utils/api";
import { useSelector } from "react-redux";
import { getUser } from "../store/slices/userSlices";

const ChangePassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const { t } = useTranslation(["common", "Login"]);
	const userService = useUserService();

	function handleNewPasswordChange(event) {
		setNewPassword(event.target.value);
	}

	function handleOldPasswordChange(event) {
		setOldPassword(event.target.value);
	}

    function handleConfirmPasswordChange(event) {
		setConfirmPassword(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		userService.changePassword(oldPassword, newPassword, confirmPassword).then((value) => {
			if (value) {
				navigate('/');
			}
		});
	}

	// const handleClick = () => navigate('/Home2');
	return (
		<div className="bg-[#f5f1f1]">
			<div className="flex-0.2">
				<img
					src={Logo2}
					alt="Logo Image"
					style={{ width: 1800, height: 150 }}
				/>
			</div>

			<div className=" bg-[#c9e5f3] ">
				<p className=" font-extrabold text-center text-[30px] text-black">
					{t("Login:welcome")}
				</p>
			</div>

			<div className=" bg-[#c9e5f3]  flex justify-center items-center p-[20px] h-screen">
				<div className="  bg-[#b0d4ed] h-auto w-[400px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
					<div className="max-w-md w-auto space-y-8">
						<div>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								{t("Login:login")}
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600"></p>
						</div>

						<form
							onSubmit={handleSubmit}
							className="mt-8 space-y-6"
							method="POST"
						>

							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="password" className="input_login">
										{t("Login:password")}
									</label>
									<input
										id="password"
										name="input_login"
										type="password"
										className="appearance-none rounded-none relative block
                  w-[350px] px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:password")}
										value={oldPassword}
										onChange={handleOldPasswordChange}
										required
									/>
								</div>
							</div>
                            <div className="rounded-md shadow-sm -space-y-px ">
								<div>
									<label htmlFor="new_password" className="input_login">
										{t("Login:new_password")}
									</label>
									<input
										id="new_password"
										name="input_login"
										type="password"
										className="appearance-none rounded-none relative block
                  w-[350px] px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:new_password")}
										value={newPassword}
										onChange={handleNewPasswordChange}
									/>
								</div>
							</div>
                            <div className="rounded-md shadow-sm -space-y-px ">
								<div>
									<label htmlFor="confirm_password" className="input_login">
										{t("Login:confirm_password")}
									</label>
									<input
										id="confirm_password"
										name="input_login"
										type="password"
										className="appearance-none rounded-none relative block
                  w-[350px] px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:confirm_password")}
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
									/>
								</div>
							</div>
							<div>
								{/* onClick={handleClick} */}
								<button
									type="submit"
									className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
								>
									{t("Login:change")}
								</button>
							</div>

							{/* </nav> */}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ChangePassword;
