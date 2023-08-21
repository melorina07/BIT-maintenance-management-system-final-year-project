import React from "react";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import useUserService from "../services/userService";

const Register = () => {
	const navigate = useNavigate();
	const handleClick = () => navigate(-1);
	const userService = useUserService();

	// const navigation = useNavigate()
	// const toLogin=()=>{
	//   alert(navigation);
	// setTimeout(()=>{
	//   navigate('/Login')
	// },400)

	// }

	const handleSubmit = (event) => {
		event.preventDefault();
    const target = event.target
		userService.register({name: target.fname.value + " " + target.lname.value, email: target.email.value, password: target.password.value});
	};
	const { t } = useTranslation(["common", "Login"]);
	return (
		<div className="bg-[#f5f1f1]">
			<div>
				<img
					src={Logo}
					alt="Logo Image"
					style={{ width: "2000px", height: "198px" }}
				/>
			</div>

			<div className=" bg-[#c9e5f3] ">
				<p className=" font-extrabold text-center text-[30px] text-black">
					{t("Login:welcome")}
				</p>
			</div>
			<div className=" bg-[#c9e5f3]  flex justify-center items-center p-[50px] h-screen  scrollbar-width: none  ">
				<div className="  bg-[#b0d4ed]  h-[460px] w-[500px] flex items-center justify-center py-60 sm:px-99 lg:px-20 rounded-xl">
					<div className="w-[400px] space-y-9">
						<div>
							<h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
								{t("Login:register")}
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600"></p>
						</div>

						<form
							className="mt-8 space-y-6"
							onSubmit={handleSubmit}
							method="POST"
						>
							{/* <input type="hidden" name="remember" defaultValue="true" /> */}
							<div className="rounded-md shadow-sm -space-y-px">
								<div className="mb-2">
									<label htmlFor="fname" className="sr-only text-gray-800">
										{t("Login:first")}
									</label>
									<input
										name="fname"
										type="Name"
										className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:first")}
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="lname" className="sr-only text-gray-800">
										{t("Login:last")}
									</label>
									<input
										name="lname"
										type="Name"
										className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:last")}
									/>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="email" className="sr-only">
										{t("Login:email")}
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:email")}
									/>
								</div>
							</div>

							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="password" className="sr-only">
										{t("Login:password")}
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder={t("Login:password")}
									/>
								</div>
							</div>

							<div>
								<input
									type="submit"
									// type="submit"
									className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
									name={t("Login:register")}
								/>
							</div>
							<p className="mt-8 text-xs font-light text-center text-gray-700">
								{t("Login:already")}&nbsp;&nbsp;
								<a
									href="#"
									className="font-medium text-indigo-600 hover:underline"
								>
									<Link to="/Login">{t("Login:login")}</Link>
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Register;
