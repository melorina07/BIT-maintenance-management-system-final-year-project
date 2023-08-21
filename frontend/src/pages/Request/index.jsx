import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logo2 from "../../assets/logo2.jpg"
import useRequestService from "../../services/requestService";
import Nav from "../../components/Nav";
import {useParams} from 'react-router-dom'
import PickUser from "./PickUser";
import Response from "./Response";
import useUserService from "../../services/userService";
import Detail from "./Detail";

const Request = ({ setIsAuthenticated }) => {
	const [requests, setRequests] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isAssigning, setIsAssigning] = useState(false);
	const [isResponsing, setIsResponsing] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	const [employees, setEmployees] = useState([])
	const params = useParams()

	const facultyId = params.id

	const requestService = useRequestService()
	const userService = useUserService()

	useEffect(() => {
		searchRequests()
		searchEmployees()
	}, [isEditing, isAdding, isAssigning, isResponsing]);

	const searchRequests = () => {
		requestService.getRequests(facultyId).then((value) => {
			setRequests(value.data.requests)
		})
	}

	const searchEmployees = () => {
		userService.getUsers().then((value) => {
			setEmployees(value.data.users)
		})
	}

	const handleEdit = (id) => {
		const [request] = requests.filter((request) => request._id === id);
		setSelectedRequest(request);
		setIsEditing(true);
	};

	const handleResponsing = (id) => {
		const [request] = requests.filter((request) => request._id === id);
		setSelectedRequest(request);
		setIsResponsing(true);
	};

	const handleAssign = (id) => {
		const [request] = requests.filter((request) => request._id === id);
		setSelectedRequest(request);
		setIsAssigning(true);
	};

	const handleDetail = (request) => {
		setSelectedRequest(request);
		setIsDetail(true);
	};

	const handleApproval = (id, status) => {
		requestService.approvalRequest(id, {status}).then(value => {
			Swal.fire({
				icon: "success",
				title: "Responsed!",
				text: `It's data has been Responsed.`,
				showConfirmButton: false,
				timer: 1500,
			});
			searchRequests()
		})
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
				requestService.deleteRequest(id).then(value => {
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: `It's data has been deleted.`,
						showConfirmButton: false,
						timer: 1500,
					});
					searchRequests()
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
				{!isAdding && !isEditing && !isAssigning && !isResponsing && !isDetail && (
					<>
						<Header
							setIsAdding={setIsAdding}
							setIsAuthenticated={setIsAuthenticated}
						/>
						<Table
							requests={requests}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							handleApproval={handleApproval}
							handleAssign={handleAssign}
							handleResponsing={handleResponsing}
							handleDetail={handleDetail}
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
						selectedRequest={selectedRequest}
						setIsEditing={setIsEditing}
					/>
				)}
				{isAssigning && (
					<PickUser
						id={selectedRequest._id}
						employees={employees}
						setIsAssigning={setIsAssigning}
					/>
				)}
				{isResponsing && (
					<Response
						id={selectedRequest._id}
						employees={employees}
						setIsResponsing={setIsResponsing}
					/>
				)}
				{isDetail && (
					<Detail
					selectedRequest={selectedRequest}
					setIsDetail={setIsDetail}
					/>
				)}
			</div>
		</div>
	);
};

export default Request;
