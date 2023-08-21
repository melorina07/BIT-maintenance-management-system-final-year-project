import useApi from '../utils/api';

const useRequestService = () => {
    const { commonApi } = useApi()

    const addRequest = (request) => {
        const response = commonApi.post(
            'request',
            {
                ...request
            }
        );
        return response;
    };

    const report = () => {
        const response = commonApi.get(
            'request/report'
        );
        return response;
    };

    const deleteRequest = (id) => {
        const response = commonApi.delete(
            `request/${id}`
        );
        return response;
    };

    const updateRequest = (id, request) => {
        const response = commonApi.patch(
            `request/${id}`,
            {
                request
            }
        );
        return response;
    };

    const approvalRequest = (id, request) => {
        const response = commonApi.patch(
            `request/${id}/approval`,
            {
                request
            }
        );
        return response;
    };

    const assignRequest = (id, request) => {
        const response = commonApi.patch(
            `request/${id}/assign`,
            {
                request
            }
        );
        return response;
    };

    const responseRequest = (id, request) => {
        const response = commonApi.patch(
            `request/${id}/response`,
            {
                request
            }
        );
        return response;
    };

    const getRequest = (id) => {
        const response = commonApi.get(
            `request/${id}`,
        );
        return response;
    };
    const getRequests = () => {
        const response = commonApi.get(
            'request'
        );
        return response;
    };

    return {addRequest, deleteRequest, updateRequest, getRequest, getRequests, approvalRequest, assignRequest, responseRequest, report}
}

export default useRequestService