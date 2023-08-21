import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logo2 from "../../assets/logo2.jpg"
import useEmployeeService from "../../services/userService";
import Nav from "../../components/Nav";
import {useParams} from 'react-router-dom'

const Employee = ({ setIsAuthenticated }) => {
	const [employees, setFaculites] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [role, setRole] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	const params = useParams()

	const departmentId = params.id

	const employeeService = useEmployeeService()

	useEffect(() => {
		searchEmployees()
	}, [isEditing, isAdding]);

	const searchEmployees = () => {
		employeeService.getUsers(departmentId).then((value) => {
			setFaculites(value.data.users)
		})
	}

	const handleEdit = (id) => {
		const [employee] = employees.filter((employee) => employee.id === id);
		setSelectedEmployee(employee);
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
				employeeService.deleteEmployee(id).then(value => {
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: `It's data has been deleted.`,
						showConfirmButton: false,
						timer: 1500,
					});
					searchEmployees()
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
					style={{ width: 1800, height: 150 }}
				/>
			</div>
			<Nav />
			<div className="container">
				{!isAdding && !isEditing && (
					<>
						<Header
							setRole={setRole}
							setIsAdding={setIsAdding}
							setIsAuthenticated={setIsAuthenticated}
						/>
						<Table
							employees={employees}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</>
				)}
				{isAdding && (
					<Add
						role={role}
						departmentId={departmentId}
						setIsAdding={setIsAdding}
					/>
				)}
				{isEditing && (
					<Edit
						selectedEmployee={selectedEmployee}
						setIsEditing={setIsEditing}
					/>
				)}
			</div>
		</div>
	);
};

export default Employee;
