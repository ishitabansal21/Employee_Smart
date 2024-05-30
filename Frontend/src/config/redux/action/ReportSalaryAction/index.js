import axios from "axios";

export const FETCH_REPORT_SALARY_SUCCESS = "FETCH_REPORT_SALARY_SUCCESS";
export const FETCH_REPORT_SALARY_FAILURE = "FETCH_REPORT_SALARY_FAILURE";
export const CLEAR_REPORT_SALARY = "CLEAR_REPORT_SALARY";

export const fetchReportSalarySuccess = (data) => ({
    type: FETCH_REPORT_SALARY_SUCCESS,
    payload: data,
});

export const fetchReportSalaryFailure = (error) => ({
    type: FETCH_REPORT_SALARY_FAILURE,
    payload: error,
});

export const clearReportSalary = () => ({
    type: CLEAR_REPORT_SALARY,
});

export const fetchReportSalaryByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchReportSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const fetchReportSalaryByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchReportSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportSalaryFailure("An error occurred while loading data."));
        }
    }
};
