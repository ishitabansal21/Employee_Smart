import axios from 'axios';
import {
    GET_DATA_ATTENDANCE_SUCCESS,
    GET_DATA_ATTENDANCE_FAILURE,
    CREATE_DATA_ATTENDANCE_SUCCESS,
    CREATE_DATA_ATTENDANCE_FAILURE,
    UPDATE_DATA_ATTENDANCE_SUCCESS,
    UPDATE_DATA_ATTENDANCE_FAILURE,
    DELETE_DATA_ATTENDANCE_SUCCESS,
    DELETE_DATA_ATTENDANCE_FAILURE
} from './dataAttendanceActionTypes';

export const getDataAttendance = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/attendance_data');
            const dataAttendance = response.data;
            dispatch({
                type: GET_DATA_ATTENDANCE_SUCCESS,
                payload: dataAttendance
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_ATTENDANCE_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataAttendance = (dataEmployee, dataAttendance, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < dataEmployee.length; i++) {
            const isNameExists = dataAttendance.some(
                (attendance) => attendance.employee_name === dataEmployee[i].employee_name
            );

            if (!isNameExists) {
                const response = await axios.post("http://localhost:5000/attendance_data", {
                    nik: dataEmployee[i].nik,
                    employee_name: dataEmployee[i].employee_name,
                    position: dataEmployee[i].position,
                    gender: dataEmployee[i].gender,
                    present: present[i] || 0,
                    sick: sick[i] || 0,
                    absent: absent[i] || 0,
                });

                dispatch({
                    type: CREATE_DATA_ATTENDANCE_SUCCESS,
                    payload: response.data,
                });

                navigate("/attendance-data");
                return response.data;
            }
        }
    } catch (error) {
        dispatch({
            type: CREATE_DATA_ATTENDANCE_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};

export const updateAttendanceData = (id, dataAttendance) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/attendance_data/update/${id}`, dataAttendance);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_DATA_ATTENDANCE_SUCCESS,
                    payload: 'Attendance data updated successfully'
                });
                dispatch(getDataAttendance());
            } else {
                dispatch({
                    type: UPDATE_DATA_ATTENDANCE_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_ATTENDANCE_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataAttendance = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/attendance_data/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_DATA_ATTENDANCE_SUCCESS,
                    payload: 'Data deletion successful'
                });
                dispatch(getDataAttendance());
            } else {
                dispatch({
                    type: DELETE_DATA_ATTENDANCE_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_DATA_ATTENDANCE_FAILURE,
                payload: error.message
            });
        }
    };
};
