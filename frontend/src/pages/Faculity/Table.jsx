import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthorization from "../../utils/authorization";

import { useTranslation } from "react-i18next";


const Table = ({ faculities, handleEdit, handleDelete }) => {
	const authorization = useAuthorization();

	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);


	return (
		<div className="contain-table">
			<table className="striped-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						{(authorization.checkAccess("faculity", "update") ||
							authorization.checkAccess("caculity", "delete")) && (
							<th colSpan={2} className="text-center">
								{t("Request:action")}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{faculities.length > 0 ? (
						faculities.map((employee, i) => (
							<tr key={employee.id}>
								<td>{i + 1}</td>
								{authorization.checkAccess("department", "read") ? (
									<td>
										<Link to={`/Faculity/${employee.id}/Department`}>
											{employee.name}
										</Link>
									</td>
								) : (
									<td>{employee.name}</td>
								)}
								{authorization.checkAccess("faculity", "update") && (
									<td className="text-right">
										<button
											onClick={() => handleEdit(employee.id)}
											className="button muted-button"
										>
											{t("Faculty:edit")}
										</button>
									</td>
								)}
								{authorization.checkAccess("faculity", "delete") && (
									<td className="text-left">
										<button
											onClick={() => handleDelete(employee.id)}
											className="button muted-button"
										>
											{t("Faculty:delete")}
										</button>
									</td>
								)}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3}>{t("Faculty:no")}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
