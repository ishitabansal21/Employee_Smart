import axios from "axios";

export const FETCH_REPORT_ABSENT_SUCCESS = "FETCH_REPORT_ABSENT_SUCCESS";
export const FETCH_REPORT_ABSENT_FAILURE = "FETCH_REPORT_ABSENT_FAILURE";
export const CLEAR_REPORT_ABSENT = "CLEAR_REPORT_ABSENT";

export const fetchReportAbsentSuccess = (data) => ({
    type: FETCH_REPORT_ABSENT_SUCCESS,
    payload: data,
});

export const fetchReportAbsentFailure = (error) => ({
    type: FETCH_REPORT_ABSENT_FAILURE,
    payload: error,
});

export const clearReportAbsent = () => ({
    type: CLEAR_REPORT_ABSENT,
});

export const fetchReportAbsentByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/attendance/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchReportAbsentSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportAbsentFailure("An error occurred while loading data."));
        }
    }
};

export const fetchReportAbsentByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/attendance/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchReportAbsentSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportAbsentFailure("An error occurred while loading data."));
        }
    }
};
