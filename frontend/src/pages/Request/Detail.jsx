import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Detail = ({ selectedRequest, setIsDetail }) => {
	const { t } = useTranslation(["common", "Login","Request","Home2"]);

	return (
		<div className="small-container" style={{ backgroundColor: "white" }}>
			<h1>{t("Request:detail")}</h1>
			<div className="flex items-center gap-x-3">
				<div className="w-1/2">
					<div className=" flex-col  gap-10 border-black-300  rounded-lg ">
						<h2 className="text-2xl m-0 text-blue-950">{t("common:typeofwork")}</h2>
						<p className="ml-5 text-lg mb-4">
							{selectedRequest.maintenanceType}
						</p>
					</div>{" "}
				</div>
				<div className="w-1/2">
					<h2 className="text-2xl m-0 text-blue-950">{t("common:phone")}</h2>
					<p className="ml-5 text-lg mb-4">{selectedRequest.phone}</p>
				</div>
			</div>
			<div className="flex gap-x-3 items-center flex-1">
				<div className="w-1/2">
					<h2 className="text-2xl m-0 text-blue-950">{t("common:bldg")}</h2>
					<p className="ml-5 text-lg mb-4">{selectedRequest.blockName}</p>
				</div>
				<div className="w-1/2">
					<h2 className="text-2xl m-0 text-blue-950">{t("common:offnum")}</h2>
					<p className="ml-5 text-lg mb-4">{selectedRequest.officeNumber}</p>
				</div>
			</div>
            <div className="flex gap-x-3 items-center flex-1">
				<div className="w-1/2">
					<h2 className="text-2xl m-0 text-blue-950">{t("Request:status")}</h2>
					<p className="ml-5 text-lg mb-4">{selectedRequest.status}</p>
				</div>
				<div className="w-1/2">
					<h2 className="text-2xl m-0 text-blue-950">{t("Request:maintener")}</h2>
					<p className="ml-5 text-lg mb-4">{selectedRequest.user && selectedRequest.user[0]?.name }</p>
				</div>
			</div>
			<h2 className="text-2xl m-0 text-blue-950">{t("common:desc")}</h2>
			<p className="ml-5 text-lg mb-4">{selectedRequest.description}</p>
            <h2 className="text-2xl m-0 text-blue-950">{t("Request:response")}</h2>
			<p className="ml-5 text-lg mb-4">{selectedRequest.response}</p>
			<div style={{ marginTop: "30px" }}>
				<input
					style={{ marginLeft: "12px" }}
					className="muted-button"
					type="button"
					value="Back"
					onClick={() => setIsDetail(false)}
				/>
			</div>
		</div>
	);
};

export default Detail;
