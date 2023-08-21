import React from "react";
import Logo2 from "../assets/logo2.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation, composeInitialProps } from "react-i18next";
import { data } from "autoprefixer";
import { useState } from "react";
import useRequestService from "../services/requestService";

const All = () => {
	// const data = [ users, setData ] = useState([])

	const { t } = useTranslation(["common", "Login"]);
    const requestService = useRequestService()

	const handleSubmit = (event) => {
		event.preventDefault();
		const target = event.target;
		requestService.addRequest({
			fullName: target.full_name.value,
			department: target.department.value,
            phone: target.phone.value,
			maintenanceType: target.maintenance_type.value,
            blockName: target.block_name.value,
            officeNumber: target.office_number.value,
            description: target.description.value
		});
	};

	return (
		<div name="all" className="w-full h-screen bg-[#f3f4f4]">
			<div className="flex-0.2">
				<img
					src={Logo2}
					alt="Logo Image"
					style={{ width: 1800, height: 150 }}
				/>
			</div>

			<div className=" bg-[#f0f1f1] flex-0.5 col-xs-12 ">
				<p className=" text-center font-extrabold text-[30px] text-black">
					{t("common:form")}
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 mb-6 md:grid-cols-3">
					<div>
						<label
							htmlFor="full_name"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray"
						>
							{t("common:name")}{" "}
						</label>
						<input
							type="text"
							id="full_name"
							className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Full Name"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="department"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray"
						>
							{t("common:faculty")}
						</label>
						<div className=" flex-col  gap-10 border-black-300  rounded-lg ">
							<select
                                id='department'
								size="lg"
								label="Select Version "
								className=" flex-col w-96 gap-10 border-black-300 dark:border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 bg-gray-50 border border-gray-300"
							>
								<option></option>
								<option>{t("common:fece")}</option>
								<option>{t("common:fcfe")}</option>
								<option>{t("common:fce")}</option>
								<option>{t("common:fmie")}</option>
								<option>{t("common:fhce")}</option>
							</select>
						</div>
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block mb-2 text-sm  text-gray-900 dark:text-gray"
						>
							{t("common:phone")}
						</label>
						<input
							type="tel"
							id="phone"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="123-45-678"
							pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="name"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray"
						>
							{t("common:supervisor")}
						</label>
						<input
							type="text"
							id="name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Chief executive officer name"
							required
						/>
					</div>
					{/* <div>
						<label
							htmlFor="phone"
							className="block mb-2 text-sm text-gray-900 dark:text-gray"
						>
							{t("common:phone")}
						</label>
						<input
							type="tel"
							id="phone"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="123-45-678"
							pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
							required
						/>
					</div> */}
					<div className="mb-6">
						<label
							htmlFor="email"
							className="block mb-2 text-sm  text-gray-900 dark:text-gray"
						>
							{t("Login:email")}
						</label>
						<input
							type="email"
							id="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Example@gmail.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="block_name"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray "
						>
							{t("common:bldg")}
						</label>
						<div className=" flex-col  gap-10 border-black-300  rounded-lg ">
							<select
                                id='block_name'
								size="lg"
								label="Select Version "
								className="  flex-col w-96 gap-10 border-black-300 dark:border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 bg-gray-50 border border-gray-300"
							>
								<option></option>

								<option>{t("common:agr")}</option>
								<option>{t("common:gih")}</option>
								<option>{t("common:reg")}</option>
								<option>{t("common:ict")}</option>
								<option>{t("common:main")}</option>
							</select>
						</div>
					</div>
					<div>
						<label
							htmlFor="office_number"
							className="block mb-2 text-sm  text-gray-900 dark:text-gray"
						>
							{t("common:offnum")}
						</label>
						<input
							type="number"
							id="office_number"
							className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Office Number"
							pattern="[0-9]"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="maintenance_type"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray"
						>
							{t("common:typeofwork")}
						</label>
						<div className=" flex-col  gap-10 border-black-300  rounded-lg ">
							<select
                                id='maintenance_type'
								size="lg"
								label="Select Version "
								className=" flex-col w-96 gap-10 border-black-300 dark:border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 bg-gray-50 border border-gray-300"
							>
								<option></option>
								<option>{t("common:water")}</option>
								<option>{t("common:light")}</option>
								<option>{t("common:door")}</option>
								<option>{t("common:furniture")}</option>
							</select>
						</div>{" "}
					</div>
				</div>

				<div className="mb-6">
					<label
						htmlFor="description"
						className="block mb-2 text-sm  text-gray-900 dark:text-black "
					>
						{t("common:reason")}
					</label>
					<input
						type="text"
						id="description"
						className="block  p-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md  focus:ring-blue-500 focus:border-blue-500 w-96 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder={t("common:desc")}
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-5/6 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{t("Login:submit")}
				</button>
			</form>
		</div>
	);
};
export default All;
