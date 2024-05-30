import axios from "axios";
import {
    GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS,
    GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE,
} from "./dataEmployeeSalaryPrintActionTypes";

export const viewDataSalarySingleEmployeeSuccess = (data) => ({
    type: GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS,
    payload: data,
});

export const viewDataSalarySingleEmployeeFailure = (error) => ({
    type: GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE,
    payload: error,
});

export const viewSalarySingleEmployeeByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salary_data/year/${dataYear}`
        );
        const data = response.data;
        dispatch(viewDataSalarySingleEmployeeSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataSalarySingleEmployeeFailure("An error occurred while loading data."));
        }
    }
};

export const viewSalarySingleEmployeeByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salary_data/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewDataSalarySingleEmployeeSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataSalarySingleEmployeeFailure("An error occurred while loading data."));
        }
    }
};

export const viewSalarySingleEmployeeByName = (employee_name) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salary_data/name/${employee_name}`
        );
        const data = response.data;
        dispatch(viewDataSalarySingleEmployeeSuccess(data));
    } catch (error) {
        console.log(error);
        if (employee_name) {
            dispatch(viewDataSalarySingleEmployeeFailure("An error occurred while loading data."));
        }
    }
};
