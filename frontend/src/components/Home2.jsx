import React from "react";
import Logo2 from "../assets/logo2.jpg";
import { Button } from "react-scroll";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Nav from "./Nav";

function Home2() {
	const { t } = useTranslation(["common", "Login"]);

	return (
		<div className="bg-[#ffffff]">
			<div className="flex-0.2">
				<img
					src={Logo2}
					alt="Logo Image"
					style={{ width: "100%", height: 150 }}
				/>
			</div>
			<Nav />
			<div className="bg-transparent grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
				<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<a href="#">
						<img
							className="rounded-t-lg"
							src=" ./assets/images/new1.jpg"
							alt=""
						/>
					</a>
					<div className="p-5">
						<a href="#">
							<h5 className="mb-2 text-2xl font-bold align-middle tracking-tight text-gray-900 dark:text-white">
								{t("Home2:general")}
							</h5>
						</a>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							{t("Home2:generaldesc")}
						</p>
						<a
							href="./All"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
         hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							{t("Home2:fill")}
							<svg
								aria-hidden="true"
								className="w-4 h-4 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1
                 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</div>
				</div>

				<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<a href="#">
						<img
							className="rounded-t-lg"
							src=" ./assets/images/new1.jpg"
							alt=""
						/>
					</a>
					<div className="p-5">
						<a href="#">
							<h5 className="mb-2 text-2xl font-bold align-middle tracking-tight text-gray-900 dark:text-white">
								{t("Home2:ict")}
							</h5>
						</a>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							{t("Home2:ictdesc")}
						</p>
						<a
							href="./All"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							{t("Home2:fill")}
							<svg
								aria-hidden="true"
								className="w-4 h-4 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home2;
