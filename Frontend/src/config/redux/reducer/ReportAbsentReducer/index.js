import {
    FETCH_REPORT_ABSENT_SUCCESS,
    FETCH_REPORT_ABSENT_FAILURE,
    CLEAR_REPORT_ABSENT,
} from "../../action/AbsentReportAction";

const initialState = {
    dataReportAbsent: [],
    error: null,
};

const reportAbsentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPORT_ABSENT_SUCCESS:
            return {
                ...state,
                dataReportAbsent: action.payload,
                error: null,
            };
        case FETCH_REPORT_ABSENT_FAILURE:
            return {
                ...state,
                dataReportAbsent: [],
                error: action.payload,
            };
        case CLEAR_REPORT_ABSENT:
            return {
                ...state,
                dataReportAbsent: [],
                error: null,
            };
        default:
            return state;
    }
};

export default reportAbsentReducer;
