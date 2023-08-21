import React from 'react';
import useAuthorization from '../../utils/authorization';

import { useTranslation } from "react-i18next";


const Header = ({ setIsAdding, setIsAuthenticated }) => {
  const authorization = useAuthorization()

  const { t } = useTranslation(["common", "Login","Request","Home2","Faculty","Department"]);


  return (
    <header>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        {authorization.checkAccess("department", "create") && <button onClick={() => setIsAdding(true)}>{t("Department:add")}</button>}
      </div>
    </header>
  );
};

export default Header;
