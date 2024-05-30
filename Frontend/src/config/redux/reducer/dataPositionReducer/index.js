import {
    GET_DATA_POSITION_SUCCESS,
    GET_DATA_POSITION_FAILURE,
    CREATE_DATA_POSITION_SUCCESS,
    CREATE_DATA_POSITION_FAILURE,
    UPDATE_DATA_POSITION_SUCCESS,
    UPDATE_DATA_POSITION_FAILURE,
    DELETE_DATA_POSITION_SUCCESS,
    DELETE_DATA_POSITION_FAILURE
} from '../../action/dataPositionAction/dataPositionActionTypes';

const initialState = {
    dataPosition: [],
    message: null,
    error: null
};

const dataPositionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_POSITION_SUCCESS:
            return {
                ...state,
                dataPosition: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_POSITION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_DATA_POSITION_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_DATA_POSITION_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DATA_POSITION_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_DATA_POSITION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_DATA_POSITION_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_DATA_POSITION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default dataPositionReducer;
