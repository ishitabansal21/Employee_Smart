import axios from 'axios';
import {
    GET_DATA_SALARY_SUCCESS,
    GET_DATA_SALARY_FAILURE,
    DELETE_DATA_SALARY_SUCCESS,
    DELETE_DATA_SALARY_FAILURE
} from './dataSalaryActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataSalary = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_salary_data`);
            dispatch({
                type: GET_DATA_SALARY_SUCCESS,
                payload: response.data
            });
            console.log("in redux getdatasalary",response.data);
        } catch (error) {
            dispatch({
                type: GET_DATA_SALARY_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataSalary = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/employee_data/id/${id}`);
            dispatch({
                type: DELETE_DATA_SALARY_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_SALARY_FAILURE,
                payload: error.message
            });
        }
    };
};
