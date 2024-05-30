import {
    GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS,
    GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE,
} from "../../action/dataEmployeeSalaryPrintAction/dataEmployeeSalaryPrintActionTypes";

const initialState = {
    dataSalaryEmployeePrint: [],
    error: null,
};


const dataSalaryEmployeePrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_SALARY_SINGLE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                dataSalaryEmployeePrint: action.payload,
                error: null,
            };
        case GET_DATA_SALARY_SINGLE_EMPLOYEE_FAILURE:
            return {
                ...state,
                dataSalaryEmployeePrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dataSalaryEmployeePrintReducer;
