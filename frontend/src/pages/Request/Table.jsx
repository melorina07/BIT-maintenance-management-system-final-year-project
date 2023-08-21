import React from "react";
import useAuthorization from "../../utils/authorization";

import { useTranslation } from "react-i18next";


const Table = ({ handleAssign, handleResponsing, handleApproval, requests, handleEdit, handleDelete, handleDetail }) => {
	const authorization = useAuthorization()
	const { t } = useTranslation(["common", "Login","Home2","Request"]);
	return (
		<div className="contain-table">
			<table className="striped-table">
				<thead>
					<tr>
						<th>id</th>
						<th>maintenance type</th>
						<th>Description</th>
						<th className="text-center">
						{t("Request:action")}
						</th>
					</tr>
				</thead>
				<tbody>
					{requests.length > 0 ? (
						requests.map((request, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{request.maintenanceType}</td>
								<td className="hover:cursor-pointer text-blue-600" onClick={() => handleDetail(request)}>{request.description}</td>
								{request.status == "Submitted" && (authorization.checkAccess("request", "update") || authorization.checkAccess("request", "delete")  || authorization.checkAccess("request", "response")) ? (
									<>
										{" "}
										<td className="text-left flex justify-end">
                   {authorization.checkAccess("request", "update")  && <button
												onClick={() => handleEdit(request._id)}
												className="button muted-button"
											>
												{t("Request:edit")}
											</button>}
                    {authorization.checkAccess("request", "delete")  && <button
												onClick={() => handleDelete(request._id)}
												className="button muted-button"
											>
												{t("Request:delete")}
											</button>}
                    {authorization.checkAccess("request", "response")  && <button
												onClick={() => handleApproval(request._id, "Accepted")}
												className="button muted-button"
											>
												{t("Request:accept")}
											</button>}
											{authorization.checkAccess("request", "response")  && <button
												onClick={() => handleApproval(request._id, "Rejected")}
												className="button muted-button"
											>
												{t("Request:reject")}
											</button>}
										</td>{" "}
									</>
								) : (
										request.status == 'Accepted' && authorization.checkAccess("request", "assign")  && <td className="text-left flex justify-end">
											<button
												onClick={() => handleAssign(request._id)}
												className="button muted-button"
											>
												{t("Request:assign")}
											</button>
										</td>                    
								)}
                {
                  request.status == 'Assigned' && authorization.checkAccess("request", "response")  ? <td className="text-left flex justify-end">
                  <button
                    onClick={() => handleResponsing(request._id)}
                    className="button muted-button"
                  >
                    {t("Request:response")}
                  </button>
                </td> : <td></td>
                }
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3}>{t("Request:no")}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
