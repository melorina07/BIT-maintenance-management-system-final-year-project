import useApi from "../utils/api";

const useDepartmentService = () => {
	const { commonApi } = useApi();

	const addDepartment = (department) => {
		const response = commonApi.post("department", {
			...department,
		});
		return response;
	};

	const deleteDepartment = (id) => {
		const response = commonApi.delete(`department/${id}`);
		return response;
	};

	const updateDepartment = (id, department) => {
		const response = commonApi.patch(`department/${id}`, {
			department,
		});
		return response;
	};
	const getDepartment = (id) => {
		const response = commonApi.get(`department/${id}`);
		return response;
	};
	const getDepartments = (facultyId) => {
		const response = commonApi.get("department", {
			params: {
				facultyId,
			},
		});
		return response;
	};

	return {
		addDepartment,
		deleteDepartment,
		updateDepartment,
		getDepartment,
		getDepartments,
	};
};

export default useDepartmentService;
