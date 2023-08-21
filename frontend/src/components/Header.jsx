import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useUserService from "../services/userService";
import { useDispatch } from "react-redux";
import { getUser } from "../store/slices/userSlices";
import { isEmpty } from "../utils/authorization";
import { useSelector } from "react-redux";

const Header = () => {
	const { i18n, t } = useTranslation(["common","Login"]);
	const userService = useUserService()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
		}
	}, []);

	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};

	const logout = () => {
		userService.logout().then((value) => {
			localStorage.clear()
			dispatch(getUser({}))
			navigate('/')
		})
	}

	return (
		<div className="flex items-center justify-end">
			<select
				className="nav-link float-right border-0 ml-1 mr-2 text-align:right bg-white w-28 h-10"
				value={localStorage.getItem("i18nextLng")}
				onChange={handleLanguageChange}
			>
				<option value="en">{t("common:english")}</option>
				<option value="am">{t("common:amharic")}</option>
			</select>
			{!isEmpty(user) && <div>
				<button onClick={logout}>{t("Login:logout")}</button>
			</div>}
		</div>
	);
};

export default Header;
