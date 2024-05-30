import axios from 'axios';
import {
    GET_DATA_POSITION_SUCCESS,
    GET_DATA_POSITION_FAILURE,
    CREATE_DATA_POSITION_SUCCESS,
    CREATE_DATA_POSITION_FAILURE,
    UPDATE_DATA_POSITION_SUCCESS,
    UPDATE_DATA_POSITION_FAILURE,
    DELETE_DATA_POSITION_SUCCESS,
    DELETE_DATA_POSITION_FAILURE
} from './dataPositionActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataPosition = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/job_data`);
            dispatch({
                type: GET_DATA_POSITION_SUCCESS,
                payload: response.data
            });
            console.log(response.data)
        } catch (error) {
            dispatch({
                type: GET_DATA_POSITION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataPosition = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/job_data`, formData);
            dispatch({
                type: CREATE_DATA_POSITION_SUCCESS,
                payload: response.data
            });
            
            return response.data;
            navigate("/job-data");
        } catch (error) {
            dispatch({
                type: CREATE_DATA_POSITION_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
    // return async (dispatch) => {
    //     try {
    //         const response = await axios.post(`${API_URL}/job_data`, formData, {
    //             headers: {
    //                 "Content-type": "multipart/form-data"
    //             }
    //         });
    //         dispatch({
    //             type: CREATE_DATA_POSITION_SUCCESS,
    //             payload: response.data
    //         });
    //         navigate("/job-data");
    //         return response.data;
    //     } catch (error) {
    //         dispatch({
    //             type: CREATE_DATA_POSITION_FAILURE,
    //             payload: error.message
    //         });
    //         throw error;
    //     }
    // };
};

//no use of this fucntion
export const updateDataPosition = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/job_data/${id}`, data);
            dispatch({
                type: UPDATE_DATA_POSITION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_POSITION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataPosition = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/job_data/${id}`);
            dispatch({
                type: DELETE_DATA_POSITION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_POSITION_FAILURE,
                payload: error.message
            });
        }
    };
};
