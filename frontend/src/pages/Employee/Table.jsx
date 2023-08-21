import React from 'react';
import useAuthorization from '../../utils/authorization';


import { useTranslation } from "react-i18next";


const Table = ({ employees, handleEdit, handleDelete }) => {
  const authorization = useAuthorization()


	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);



  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {(authorization.checkAccess("employee", "update") || authorization.checkAccess("employee", "delete") ) && <th colSpan={2} className="text-center">
            {t("Request:action")}
            </th>}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                {authorization.checkAccess("employee", "update") &&<td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                   {t("Faculty:edit")}
                  </button>
                </td>}
                {authorization.checkAccess("employee", "delete") &&<td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    {t("Faculty:delete")}
                  </button>
                </td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>{t("Employee:no")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
