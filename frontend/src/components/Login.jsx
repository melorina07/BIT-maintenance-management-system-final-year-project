import React, { useState } from "react";
import Logo2 from "../assets/logo2.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUserService from "../services/userService";
import { appURL } from "../utils/api";
import { useDispatch } from "react-redux";
import { getUser } from "../store/slices/userSlices";

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { t } = useTranslation(["common", "Login"]);
	const userService = useUserService();

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	const addToken = (value) => {
		localStorage.setItem(
			`${appURL}.token.authorizationData`,
			value.token
		);
		localStorage.setItem(
			`${appURL}.refresh.authorizationData`,
			value.token
		);
		dispatch(getUser(value.user));
		if (value.user.is_first){
			navigate("/ChangePassword");
		} else {
			navigate('/')
		}
	};

	function handleSubmit(event) {
		event.preventDefault();
		userService.login({ email, password }).then((value) => {
			if (value.data.token) {
				addToken(value.data);
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
					style={{ width: "100%", height: 150 }}
				/>
			</div>

			<div className=" bg-[#c9e5f3] ">
				<p className=" font-extrabold text-center text-[30px] text-black">
					{t("Login:welcome")}
				</p>
			</div>

			<div className=" bg-[#c9e5f3]  flex justify-center items-center p-[20px] h-screen">
				<div className="  bg-[#b0d4ed] h-auto w-[400px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 rounded-xl ">
					<div className="max-w-md w-auto space-y-8">
						<div>
							<h2 className="text-center text-3xl font-extrabold text-gray-900 ">
								{t("Login:login")}
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600"></p>
						</div>

						<form
							onSubmit={handleSubmit}
							className="mt-8 space-y-6"
							method="POST"
						>
							<input type="hidden" name="remember" defaultValue="true" />
							<div className="rounded-md shadow-sm -space-y-px ">
								<div>
									<label htmlFor="email" className="input_login">
										{t("Login:email")}
									</label>
									<input
										id="un"
										name="input_login"
										type="email"
										className="bg-gray-50 appearance-none rounded-none relative block
                  w-[350px] px-3 py-2 border border-gray-300
                  text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:email")}
										value={email}
										onChange={handleEmailChange}
									/>
								</div>
							</div>

							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="password" className="input_login">
										{t("Login:password")}
									</label>
									<input
										id="password"
										name="input_login"
										type="password"
										className="bg-gray-50 appearance-none rounded-none relative block
                  w-[350px] px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:password")}
										value={password}
										onChange={handlePasswordChange}
										required
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
                  border-gray-300 rounded"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-gray-900"
									>
										{t("Login:remember")}
									</label>
								</div>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<div className="text-sm mt-7">
									<a
										href="#"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										<Link to="/password/forgot">
											<p>{t("Login:forgot")}</p>
										</Link>
									</a>
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
									{t("Login:log")}
								</button>
							</div>

							<p className="mt-8 text-xs font-light text-center text-gray-700">
								{" "}
								{t("Login:noaccount")}{" "}
								<a
									href="#"
									className="font-medium text-indigo-600 hover:underline"
								>
									<Link to="/Register">{t("Login:register")}</Link>
								</a>
							</p>

							{/* </nav> */}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
