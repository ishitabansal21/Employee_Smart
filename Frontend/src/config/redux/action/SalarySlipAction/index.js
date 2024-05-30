import axios from "axios";

export const FETCH_SLIP_SALARY_SUCCESS = "FETCH_SLIP_SALARY_SUCCESS";
export const FETCH_SLIP_SALARY_FAILURE = "FETCH_SLIP_SALARY_FAILURE";
export const CLEAR_SLIP_SALARY = "CLEAR_SLIP_SALARY";

export const fetchSlipSalarySuccess = (data) => ({
    type: FETCH_SLIP_SALARY_SUCCESS,
    payload: data,
});

export const fetchSlipSalaryFailure = (error) => ({
    type: FETCH_SLIP_SALARY_FAILURE,
    payload: error,
});

export const clearSlipSalary = () => ({
    type: CLEAR_SLIP_SALARY,
});

export const fetchSlipSalaryByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/pay_slip/year/${selectedYear}`
        );
        const data = response.data;
        console.log("Data of salary",data);
        dispatch(fetchSlipSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSlipSalaryByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/pay_slip/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSlipSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSlipSalaryByName = (selectedName, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/pay_slip/name/${selectedName}`
        );
        const data = response.data;
        dispatch(fetchSlipSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipSalaryFailure("An error occurred while loading data."));
        }
    }
};
