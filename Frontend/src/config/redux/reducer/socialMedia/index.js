// postReducer.js

import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE} from "../../action/socialMedia";

const initialState = {
    isLoading: false,
    error: null,
    posts:[],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                posts: action.payload, // Update posts array with fetched posts
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                posts: [], // Clear posts array on failure
            };   
        default:
            return state;
    }
};

export default postReducer;
