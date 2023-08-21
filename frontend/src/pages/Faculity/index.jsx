import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logo2 from "../../assets/logo2.jpg"
import useFaculityService from "../../services/faculityService";
import Nav from "../../components/Nav";

const Faculity = ({ setIsAuthenticated }) => {
	const [faculities, setFaculites] = useState([]);
	const [selectedFaculity, setSelectedFaculity] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const faculityService = useFaculityService()

	useEffect(() => {
		searchFaculities()
	}, [isEditing, isAdding]);

	const searchFaculities = () => {
		faculityService.getFaculitys().then((value) => {
			setFaculites(value.data.faculities)
		})
	}

	const handleEdit = (id) => {
		const [faculity] = faculities.filter((faculity) => faculity.id === id);
		setSelectedFaculity(faculity);
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
				faculityService.deleteFaculity(id).then(value => {
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: `It's data has been deleted.`,
						showConfirmButton: false,
						timer: 1500,
					});
					searchFaculities()
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
							faculities={faculities}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</>
				)}
				{isAdding && (
					<Add
						setIsAdding={setIsAdding}
					/>
				)}
				{isEditing && (
					<Edit
						selectedFaculity={selectedFaculity}
						setIsEditing={setIsEditing}
					/>
				)}
			</div>
		</div>
	);
};

export default Faculity;
