import React, { useState } from "react";
import Swal from "sweetalert2";
import useUserService from "../../services/userService";


import { useTranslation } from "react-i18next";


const Add = ({ departmentId, setIsAdding, role }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userService = useUserService();


	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);


	const handleAdd = (e) => {
		e.preventDefault();

		if (!name || !password || !email || !role || !departmentId) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		userService
			.register({ name, email, password, role, departmentId })
			.then((value) => {
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
				<h1>{t("Employee:add")}</h1>
				<label htmlFor="name">{t("Employee:name")}</label>
				<input
					id="name"
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="email">{t("Employee:email")}</label>
				<input
					id="email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">{t("Employee:password")}</label>
				<input
					id="password"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{/* <label>
					Role:
					<select
						value={role}
						onChange={(event) => setRole(event.target.value)}
					>
						<option value="">{t("Employee:select")}</option>
						<option value="Staff">Staff</option>
						<option value="Dean">Dean</option>
					</select>
				</label>  */}
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
