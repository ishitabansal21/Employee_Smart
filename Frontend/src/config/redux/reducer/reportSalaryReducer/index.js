import {
    FETCH_REPORT_SALARY_SUCCESS,
    FETCH_REPORT_SALARY_FAILURE,
    CLEAR_REPORT_SALARY,
} from "../../action/ReportSalaryAction";

const initialState = {
    dataReportSalary: [],
    error: null,
};

const reportSalaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPORT_SALARY_SUCCESS:
            return {
                ...state,
                dataReportSalary: action.payload,
                error: null,
            };
        case FETCH_REPORT_SALARY_FAILURE:
            return {
                ...state,
                dataReportSalary: [],
                error: action.payload,
            };
        case CLEAR_REPORT_SALARY:
            return {
                ...state,
                dataReportSalary: [],
                error: null,
            };
        default:
            return state;
    }
};

export default reportSalaryReducer;
