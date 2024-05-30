import axios from 'axios';
import {
    GET_DATA_DEDUCTION_SUCCESS,
    GET_DATA_DEDUCTION_FAILURE,
    CREATE_DATA_DEDUCTION_SUCCESS,
    CREATE_DATA_DEDUCTION_FAILURE,
    UPDATE_DATA_DEDUCTION_SUCCESS,
    UPDATE_DATA_DEDUCTION_FAILURE,
    DELETE_DATA_DEDUCTION_SUCCESS,
    DELETE_DATA_DEDUCTION_FAILURE
} from './dataDeductionActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataDeduction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/salary_deduction`);
            dispatch({
                type: GET_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataDeduction = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/salary_deduction`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
            navigate("/deduction-data");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDataDeduction = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/salary_deduction/update/${id}`, data);
            dispatch({
                type: UPDATE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataDeduction = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/salary_deduction/${id}`);
            dispatch({
                type: DELETE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};
