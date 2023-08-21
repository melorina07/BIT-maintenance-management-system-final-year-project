import React from "react";
import useAuthorization from "../../utils/authorization";
import useRequestService from "../../services/requestService";
import FileDownload from 'js-file-download'

import { useTranslation } from "react-i18next";


const Header = ({ setIsAdding, setIsAuthenticated }) => {
	const authorization = useAuthorization();
	const requestService = useRequestService();

	const { t } = useTranslation(["common", "Login","Home2","Request"]);

	const getReport = () => {
		requestService.report().then((response) => {
      FileDownload(response.data, 'report.csv')
		});
	};

  const handleDownload = async () => {
    const res = await fetch("http://localhost:3001/api/v2/request/report");
    const blob = await res.blob();
    download(blob, "test.pdf");
   }

	return (
		<header>
			<div style={{ marginTop: "30px", marginBottom: "18px" }}>
				{authorization.checkAccess("request", "create") && (
					<button onClick={() => setIsAdding(true)}>{t("Request:add")}</button>
				)}
				{<button onClick={getReport}>{t("Request:report")}</button>}
			</div>
		</header>
	);
};

export default Header;
