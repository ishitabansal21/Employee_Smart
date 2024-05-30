import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dataSalaryEmployeePrintReducer from './reducer/dataEmployeeSalaryPrintReducer';
import dataEmployeeReducer from './reducer/dataEmployeeReducer';
import dataPositionReducer from './reducer/dataPositionReducer';
import dataAttendanceReducer from './reducer/dataAttendanceReducer';
import dataDeductionReducer from './reducer/dataDeductionReducer';
import dataSalaryReducer from './reducer/dataSalaryReducer';
import reportAbsentReducer from './reducer/ReportAbsentReducer';
import reportSalaryReducer from './reducer/reportSalaryReducer';
import slipSalaryReducer from './reducer/slipSalaryReducer';
import changePasswordReducer from './reducer/changePasswordReducer';
import postReducer from './reducer/socialMedia';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dataSalaryEmployeePrint: dataSalaryEmployeePrintReducer,
        dataEmployee: dataEmployeeReducer,
        dataPosition: dataPositionReducer,
        dataAttendance: dataAttendanceReducer,
        dataDeduction: dataDeductionReducer,
        dataSalary: dataSalaryReducer,
        reportAbsent: reportAbsentReducer,
        reportSalary: reportSalaryReducer,
        slipSalary: slipSalaryReducer,
        changePassword: changePasswordReducer,
        makePost:postReducer,
    },
});

export default store;
