import {
    FETCH_SLIP_SALARY_SUCCESS,
    FETCH_SLIP_SALARY_FAILURE,
    CLEAR_SLIP_SALARY,
} from "../../action/SalarySlipAction";

const initialState = {
    dataSlipSalary: [],
    error: null,
};

const slipSalaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIP_SALARY_SUCCESS:
            return {
                ...state,
                dataSlipSalary: action.payload,
                error: null,
            };
        case FETCH_SLIP_SALARY_FAILURE:
            return {
                ...state,
                dataSlipSalary: [],
                error: action.payload,
            };
        case CLEAR_SLIP_SALARY:
            return {
                ...state,
                dataSlipSalary: [],
                error: null,
            };
        default:
            return state;
    }
};

export default slipSalaryReducer;
