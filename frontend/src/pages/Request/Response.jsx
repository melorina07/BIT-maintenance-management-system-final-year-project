import React, { useState } from "react";
import Swal from "sweetalert2";
import useRequestService from "../../services/requestService";

const Add = ({id, setIsResponsing }) => {
	const [response, setResponse] = useState("");

	const requestService = useRequestService();

	const handleAdd = (e) => {
		e.preventDefault();

		if (!response) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}
		requestService.responseRequest(id, { response }).then((value) => {
			setIsResponsing(false);

			Swal.fire({
				icon: "success",
				title: "Responsed!",
				text: `${response}'s data has been Responsed.`,
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return (
		<div className="small-container" style={{ backgroundColor: "white" }}>
			<form onSubmit={handleAdd}>
				<h1>Add Response</h1>
				<label htmlFor="response">Response</label>
				<textarea
					row="5"
					id="response"
					type="text"
					name="response"
					value={response}
					onChange={(e) => setResponse(e.target.value)}
				></textarea>
				<div style={{ marginTop: "30px" }}>
					<input type="submit" value="Add" />
					<input
						style={{ marginLeft: "12px" }}
						className="muted-button"
						type="button"
						value="Cancel"
						onClick={() => setIsResponsing(false)}
					/>
				</div>
			</form>
		</div>
	);
};

export default Add;
