import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logo2 from "../../assets/logo2.jpg"
import useDepartmentService from "../../services/departmentService";
import Nav from "../../components/Nav";
import {useParams} from 'react-router-dom'

const Department = ({ setIsAuthenticated }) => {
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const params = useParams()




	const facultyId = params.id

	const departmentService = useDepartmentService()

	useEffect(() => {
		searchDepartments()
	}, [isEditing, isAdding]);

	const searchDepartments = () => {
		departmentService.getDepartments(facultyId).then((value) => {
			setDepartments(value.data.departments)
		})
	}

	const handleEdit = (id) => {
		const [department] = departments.filter((department) => department.id === id);
		setSelectedDepartment(department);
		setIsEditing(true);
	};

	const handleDelete = (id) => {
		Swal.fire({
			icon: "warning",
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
		}).then((result) => {
			if (result.value) {
				departmentService.deleteDepartment(id).then(value => {
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: `It's data has been deleted.`,
						showConfirmButton: false,
						timer: 1500,
					});
					searchDepartments()
				})
			}
		});
	};

	return (
		<div className="bg-[#c9e5f3] h-screen">
			<div className="flex-0.2">
				<img
					src={Logo2}
					alt="Logo Image"
					style={{ width: "100%", height: 150 }}
				/>
			</div>
			<Nav />
			<div className="container">
				{!isAdding && !isEditing && (
					<>
						<Header
							setIsAdding={setIsAdding}
							setIsAuthenticated={setIsAuthenticated}
						/>
						<Table
							departments={departments}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</>
				)}
				{isAdding && (
					<Add
						facultyId={facultyId}
						setIsAdding={setIsAdding}
					/>
				)}
				{isEditing && (
					<Edit
						selectedDepartment={selectedDepartment}
						setIsEditing={setIsEditing}
					/>
				)}
			</div>
		</div>
	);
};

export default Department;
