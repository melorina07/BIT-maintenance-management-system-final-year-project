import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useFaculityService from '../../services/faculityService';


import { useTranslation } from "react-i18next";


const Edit = ({ selectedFaculity, setIsEditing }) => {
  const id = selectedFaculity.id;

  const [name, setName] = useState(selectedFaculity.name);
  const faculityService = useFaculityService();


	const { t } = useTranslation(["common", "Login","Request","Home2","Faculty"]);



  const handleUpdate = e => {
    e.preventDefault();

    if (!name) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    faculityService.updateFaculity(id, { name }).then((value) => {
			setIsEditing(false);

			Swal.fire({
				icon: "success",
				title: "Added!",
				text: `${name}'s data has been Added.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
  };

  return (
    <div className="small-container" style={{backgroundColor: 'white'}}>
      <form onSubmit={handleUpdate}>
        <h1>{t("Faculty:editf")}</h1>
        <label htmlFor="name">{t("Faculty:name")}</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
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
