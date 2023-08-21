import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useDepartmentService from '../../services/departmentService';



import { useTranslation } from "react-i18next";


const Edit = ({ selectedDepartment, setIsEditing }) => {
  const id = selectedDepartment.id;

  const [departmentName, setDepartmentName] = useState(selectedDepartment.departmentName);
  const departmentService = useDepartmentService();


	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty","Department"]);




  const handleUpdate = e => {
    e.preventDefault();

    if (!departmentName) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    departmentService.updateDepartment(id, { departmentName }).then((value) => {
			setIsEditing(false);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `${departmentName}'s data has been Added.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
  };

  return (
    <div className="small-container" style={{backgroundColor: 'white'}}>
      <form onSubmit={handleUpdate}>
        <h1>{t("Department:edit")}</h1>
        <label htmlFor="departmentName">{t("Department:name")}</label>
        <input
          id="departmentName"
          type="text"
          name="departmentName"
          value={departmentName}
          onChange={e => setDepartmentName(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
