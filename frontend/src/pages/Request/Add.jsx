import React, { useState } from "react";
import Swal from "sweetalert2";
import useRequestService from "../../services/requestService";
import { useTranslation } from "react-i18next";

const Add = ({setIsAdding }) => {
	const [maintenanceType, setMaintenanceType] = useState("");
	const [blockName, setBlockName] = useState("");
	const [officeNumber, setOfficeNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [description, setDescription] = useState("");

	const requestService = useRequestService();
	const { t } = useTranslation(["common", "Login"]);

	const handleAdd = (e) => {
		e.preventDefault();	
		if (!maintenanceType || !blockName || !officeNumber || !phoneNumber || !description) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}
		requestService.addRequest({ maintenanceType, blockName, officeNumber, phone: phoneNumber, description }).then((value) => {
			setIsAdding(false);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `${maintenanceType}'s data has been Added.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return (
		<div className="small-container" style={{ backgroundColor: "white" }}>
			<form onSubmit={handleAdd}>
				<h1>{t("Request:add")}</h1>
				<div className="flex items-center gap-x-3">
					<div className="w-1/2">
						<label
							htmlFor="maintenance_type"
							className="block mb-2 text-bold  text-gray-900 dark:text-gray w-full"
						>
							{t("common:typeofwork")}
						</label>
						<div className=" flex-col  gap-10 border-black-300  rounded-lg ">
							<select
								id="maintenance_type"
								size="lg"
								label="Select Version "
								className=" flex-col w-96 gap-10 border-black-300 dark:border-gray-600 rounded-lg p-2.5 focus:ring-blue-500 bg-gray-50 border border-gray-300"
								value={maintenanceType}
								onChange={(event) => setMaintenanceType(event.target.value)}
							>
								<option></option>
								<option>{t("common:water")}</option>
								<option>{t("common:light")}</option>
								<option>{t("common:door")}</option>
								<option>{t("common:furniture")}</option>
							</select>
						</div>{" "}
					</div>
					<div className="w-1/2">
						<label htmlFor="phone_number">{t("common:phone")}</label>
						<input
							id="phone_number"
							type="text"
							name="phone_number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex gap-x-3 items-center flex-1">
					<div className="w-1/2">
						<label htmlFor="block_name">{t("common:bldg")}</label>
						<input
							id="block_name"
							type="text"
							name="block_name"
							value={blockName}
							onChange={(e) => setBlockName(e.target.value)}
						/>
					</div>
					<div className="w-1/2">
						<label htmlFor="office_number">{t("common:offnum")}</label>
						<input
							id="office_number"
							type="text"
							name="office_number"
							value={officeNumber}
							onChange={(e) => setOfficeNumber(e.target.value)}
						/>
					</div>
				</div>
				<label htmlFor="description">{t("common:desc")}</label>
				<textarea
					id="description"
					type="text"
					rows={4}
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<div style={{ marginTop: "30px" }}>
					<button type="submit" value="Add" >{t("Login:submit")}</button>
					<button
						style={{ marginLeft: "12px" }}
						className="muted-button"
						type="button"
						value="Cancel"
						onClick={() => setIsAdding(false)}
					>{t("Login:cancel")}</button>
				</div>
			</form>
		</div>
	);
};

export default Add;
