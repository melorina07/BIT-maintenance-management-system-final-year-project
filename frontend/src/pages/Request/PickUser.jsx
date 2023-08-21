import React, { useState } from "react";
import Swal from "sweetalert2";
import useRequestService from "../../services/requestService";
import { useTranslation } from "react-i18next";


const PickUser = ({id, employees, setIsAssigning }) => {
	const [user, setUser] = useState("");

	const requestService = useRequestService();
	const { t } = useTranslation(["common", "Login","Home2","Request"]);
	const handleAssign = (e) => {
		e.preventDefault();

		if (!user) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "user is required",
				showConfirmButton: true,
			});
		}
		requestService.assignRequest(id, { user }).then((value) => {
			setIsAssigning(false);

			Swal.fire({
				icon: "success",
				title: "Assigned!",
				text: `${user} has been Assigned.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return (
		<div className="contain-table">
			<form onSubmit={handleAssign}>
				<table className="striped-table">
					<thead>
						<tr>
							<th></th>
							<th>ID</th>
							<th>{t("Home2:name")}</th>
							<th>{t("Login:email")}</th>
							<th>{t("Home2:role")}</th>
						</tr>
					</thead>
					<tbody>
						{employees.length > 0 ? (
							employees.map((employee, i) => (
								<tr key={employee.id}>
									<td>
										<input type="radio" name="user" value={employee._id} onChange={e => setUser(e.target.value)} />
									</td>
									<td>{i + 1}</td>
									<td>{employee.name}</td>
									<td>{employee.email}</td>
									<td>{employee.role}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5}>No Employee</td>
							</tr>
						)}
					</tbody>
				</table>
				<div style={{ marginTop: "30px" }}>
					<input type="submit" value="Select" />
					<input
						style={{ marginLeft: "12px" }}
						className="muted-button"
						type="button"
						value="Cancel"
						onClick={() => setIsAssigning(false)}
					/>
				</div>
			</form>
		</div>
	);
};

export default PickUser;
