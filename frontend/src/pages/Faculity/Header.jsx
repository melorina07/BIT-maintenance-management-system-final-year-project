import React from 'react';
import useAuthorization from '../../utils/authorization';


import { useTranslation } from "react-i18next";

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  const authorization = useAuthorization() 


  const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);

  return (
    <header>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        {authorization.checkAccess("faculity", "create") && <button onClick={() => setIsAdding(true)}>{t("Faculty:addf")}</button>}
      </div>
    </header>
  );
};

export default Header;
