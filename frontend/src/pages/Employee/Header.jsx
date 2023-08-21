import React from 'react';
import useAuthorization from '../../utils/authorization';



import { useTranslation } from "react-i18next";




const Header = ({ setIsAdding, setRole, setIsAuthenticated }) => {
  const authorization = useAuthorization()

	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty","Employee"]);


  return (
    <header>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        {authorization.checkAccess("employee", "create_dean") && <button onClick={() => {setRole("Dean");setIsAdding(true)}}>{t("Employee:addd")}</button>}
      </div>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        {authorization.checkAccess("employee", "create_staff") && <button onClick={() => {setRole("Staff");setIsAdding(true)}}>{t("Employee:adds")}</button>}
      </div>
    </header>
  );
};

export default Header;
