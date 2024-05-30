import axios from "axios";

export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POST_FAILURE";
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const fetchPosts = (data) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: data,
});

export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error,
});

// export const createPost = () => ({
//     type: CREATE_POST,
// });

export const getAllPosts = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/posts`
        );
        const data = response.data;
        console.log("getallpostsdata",data);
        dispatch(fetchPosts(data));
        //onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchPostsFailure("An error occurred while loading data."));
        }
    }
};


export const createPost = (formData, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_POST_REQUEST });

        try {
            const response = await axios.post(`http://localhost:5000/posts`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_POST_SUCCESS,
                payload: response.data
            });
           // navigate("/employee-data");
            return response.data;
        } catch (error) {
            
            dispatch({
                type: CREATE_POST_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};



// export const fetchSlipSalaryByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
//     try {
//         const response = await axios.get(
//             `http://localhost:5000/report/pay_slip/month/${selectedMonth}`
//         );
//         const data = response.data;
//         dispatch(fetchSlipSalarySuccess(data));
//         onDataFound();
//     } catch (error) {
//         if (error.response && error.response.data) {
//             dispatch(fetchSlipSalaryFailure("An error occurred while loading data."));
//         }
//     }
// };

// export const fetchSlipSalaryByName = (selectedName, onDataFound) => async (dispatch) => {
//     try {
//         const response = await axios.get(
//             `http://localhost:5000/report/pay_slip/name/${selectedName}`
//         );
//         const data = response.data;
//         dispatch(fetchSlipSalarySuccess(data));
//         onDataFound();
//     } catch (error) {
//         if (error.response && error.response.data) {
//             dispatch(fetchSlipSalaryFailure("An error occurred while loading data."));
//         }
//     }
// };
