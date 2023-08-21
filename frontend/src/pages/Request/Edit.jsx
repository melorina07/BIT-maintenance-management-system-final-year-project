import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useRequestService from '../../services/requestService';
import { useTranslation } from "react-i18next";

const Edit = ({ selectedRequest, setIsEditing }) => {
  const id = selectedRequest._id;

  const [maintenanceType, setMaintenanceType] = useState(selectedRequest.maintenanceType);
	const [blockName, setBlockName] = useState(selectedRequest.blockName);
	const [officeNumber, setOfficeNumber] = useState(selectedRequest.officeNumber);
	const [phoneNumber, setPhoneNumber] = useState(selectedRequest.phone);
	const [description, setDescription] = useState(selectedRequest.description);
  const requestService = useRequestService();
  const { t } = useTranslation(["common", "Login","Request","Home2"]);

  const handleUpdate = e => {
    e.preventDefault();

    if (!maintenanceType || !blockName || !officeNumber || !phoneNumber || !description) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

    requestService.updateRequest(id, { maintenanceType, blockName, officeNumber, phone: phoneNumber, description }).then((value) => {
			setIsEditing(false);

			Swal.fire({
				icon: "success",
				title: "updated!",
				text: `${maintenanceType}'s data has been Updated.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
  };

  return (
    <div className="small-container" style={{ backgroundColor: "white" }}>
			<form onSubmit={handleUpdate}>
				<h1>{t("Request:update")}</h1>
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
					<button type="submit" value="Update" >{t("Request:up")}</button>
					<button
						style={{ marginLeft: "12px" }}
						className="muted-button"
						type="button"
						value="Cancel"
						onClick={() => setIsEditing(false)}
					>{t("Login:cancel")}</button>
				</div>
			</form>
		</div>
  );
};

export default Edit;
