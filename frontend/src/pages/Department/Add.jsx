import React, { useState } from "react";
import Swal from "sweetalert2";
import useDepartmentService from "../../services/departmentService";



import { useTranslation } from "react-i18next";


const Add = ({ facultyId, setIsAdding }) => {
	const [departmentName, setDepartmentName] = useState("");


	const departmentService = useDepartmentService();
	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty","Department"]);


	const handleAdd = (e) => {
		e.preventDefault();

		if (!departmentName || !facultyId) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}
		departmentService.addDepartment({ departmentName, facultyId  }).then((value) => {
			setIsAdding(false);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `${departmentName}'s data has been Added.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return (
		<div className="small-container" style={{ backgroundColor: "white" }}>
			<form onSubmit={handleAdd}>
				<h1>{t("Department:add")}</h1>
				<label htmlFor="departmentName">{t("Department:name")}</label>
				<input
					id="departmentName"
					type="text"
					name="departmentName"
					value={departmentName}
					onChange={(e) => setDepartmentName(e.target.value)}
				/>
				<div style={{ marginTop: "30px" }}>
					<button type="submit" value="Add" >{t("Faculty:add")}</button>
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
