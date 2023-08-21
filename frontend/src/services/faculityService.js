import useApi from '../utils/api';

const useFaculityService = () => {
    const { commonApi } = useApi()

    const addFaculity = (faculity) => {
        const response = commonApi.post(
            'faculity',
            {
                ...faculity
            }
        );
        return response;
    };

    const deleteFaculity = (id) => {
        const response = commonApi.delete(
            `faculity/${id}`
        );
        return response;
    };

    const updateFaculity = (id, faculity) => {
        const response = commonApi.patch(
            `faculity/${id}`,
            {
                faculity
            }
        );
        return response;
    };
    const getFaculity = (id) => {
        const response = commonApi.get(
            `faculity/${id}`
        );
        return response;
    };
    const getFaculitys = () => {
        const response = commonApi.get(
            'faculity'
        );
        return response;
    };

    return {addFaculity, deleteFaculity, updateFaculity, getFaculity, getFaculitys}
}

export default useFaculityService