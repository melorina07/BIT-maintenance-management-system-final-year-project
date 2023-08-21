import React, { useState } from "react";
import Swal from "sweetalert2";
import useFaculityService from "../../services/faculityService";


import { useTranslation } from "react-i18next";


const Add = ({ setIsAdding }) => {
	const [name, setName] = useState("");

	const faculityService = useFaculityService();


	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);

	const handleAdd = (e) => {
		e.preventDefault();

		if (!name) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}
		faculityService.addFaculity({ name }).then((value) => {
			setIsAdding(false);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `${name}'s data has been Added.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return (
		<div className="small-container" style={{ backgroundColor: "white" }}>
			<form onSubmit={handleAdd}>
				<h1>{t("Faculty:addf")}</h1>
				<label htmlFor="name">{t("Faculty:name")}</label>
				<input
					id="name"
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
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
