import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuthorization from '../../utils/authorization';

import { useTranslation } from "react-i18next";



const Table = ({ departments, handleEdit, handleDelete }) => {
  const authorization = useAuthorization()
  const { t } = useTranslation(["common", "Login","Request","Home2","Faculty","Department"]);


  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {(authorization.checkAccess("department", "update") || authorization.checkAccess("department", "delete")) && <th colSpan={2} className="text-center">
              Actions
            </th>}
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((department, i) => (
              <tr key={department.id}>
                <td>{i + 1}</td>
                <td><Link to={`/Department/${department.id}/Employee`}>{department.departmentName}</Link></td>
                {authorization.checkAccess("department", "update") && <td className="text-right">
                  <button
                    onClick={() => handleEdit(department.id)}
                    className="button muted-button"
                  >
                    {t("Faculty:edit")}
                  </button>
                </td>}
               { authorization.checkAccess("department", "delete") && <td className="text-left">
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="button muted-button"
                  >
                    {t("Faculty:delete")}
                  </button>
                </td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>{t("Department:no")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
