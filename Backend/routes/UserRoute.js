
import express from 'express';

/* === Import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === Import Controllers === */
import {
    getEmployeeData,
    getEmployeeDataByID,
    createEmployeeData,
    updateEmployeeData,
    deleteEmployeeData,
    getEmployeeDataByNik,
    getEmployeeDataByName,
} from '../controllers/EmployeeData.js';

import {
    getJobData,
    createJobData,
    updateJobData,
    deleteJobData,
    getJobDataByID,
    getAllDepartments
} from "../controllers/JobDepartmentData.js";

import {
    viewDataAttendance,
    createAttendanceData,
    updateDataAttendance,
    deleteDataAttendance,
    // viewDataAttendanceByID,
    viewSalaryDataByName,
} from "../controllers/TransactionController.js";

import {
    createDataSalaryDeduction,
    deleteDataSalaryDeduction,
    viewDataSalaryDeductionByID,
    updateDataSalaryDeduction,
    viewDataSalaryDeduction
} from "../controllers/TransactionController.js";

import {
    viewEmployeeSalaryData,
    viewEmployeeSalaryDataByMonth,
    viewEmployeeSalaryDataByYear
} from "../controllers/TransactionController.js";

import {
    viewEmployeeAttendanceReportByMonth,
    viewEmployeeAttendanceReportByYear,
    viewEmployeeSalaryReport,
    viewEmployeeSalaryReportByMonth,
    viewEmployeeSalaryReportByName,
    viewEmployeeSalaryReportByYear,
    viewPaySlipByMonth,
    viewPaySlipByName,
    viewPaySlipByYear,
} from "../controllers/ReportController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import {
    employeeDashboard,
    viewSingleEmployeeSalaryByMonth,
    viewSingleEmployeeSalaryByYear,
    getEmailsOfEmployeesInSameDepartment,
    sendInvites
} from '../controllers/Employee.js';

const router = express.Router();

// Admin Route :

/* ==== Master Data ==== */
// Employee Data
router.get('/employee_data', verifyUser, adminOnly, getEmployeeData);
router.get('/employee_data/id/:id', verifyUser, adminOnly, getEmployeeDataByID);
router.get('/employee_data/nik/:nik', verifyUser, adminOnly, getEmployeeDataByNik);
router.get('/employee_data/name/:name', verifyUser, getEmployeeDataByName);
router.post('/employee_data', verifyUser, adminOnly, createEmployeeData);
router.patch('/employee_data/:id', verifyUser, adminOnly, updateEmployeeData);
router.delete('/employee_data/:id', verifyUser, adminOnly, deleteEmployeeData);
router.patch('/employee_data/:id/change_password', verifyUser, adminOnly, changePassword);
// Job Data
router.get('/job_data', verifyUser, adminOnly, getJobData);
router.get('/job_data/:id', verifyUser, adminOnly, getJobDataByID);
router.post('/job_data', verifyUser, adminOnly, createJobData);
router.patch('/job_data/:id', verifyUser, adminOnly, updateJobData);
router.delete('/job_data/:id', verifyUser, adminOnly, deleteJobData);

/* ==== Transactions ==== */
// Attendance Data
router.get('/attendance_data', verifyUser, adminOnly, viewDataAttendance);
// router.get('/attendance_data/:id', verifyUser, adminOnly, viewDataAttendanceByID);
router.post('/attendance_data', verifyUser, adminOnly, createAttendanceData);
router.get('/get-all-departments', verifyUser, adminOnly, getAllDepartments)
router.patch('/attendance_data/update/:id', verifyUser, adminOnly, updateDataAttendance);
router.delete('/attendance_data/:id', verifyUser, adminOnly, deleteDataAttendance);
// Salary Deduction Data
router.get('/salary_deduction', adminOnly, verifyUser, viewDataSalaryDeduction);
router.get('/salary_deduction/:id', adminOnly, verifyUser, viewDataSalaryDeductionByID);
router.post('/salary_deduction', adminOnly, verifyUser, createDataSalaryDeduction);
router.patch('/salary_deduction/update/:id', adminOnly, verifyUser, updateDataSalaryDeduction);
router.delete('/salary_deduction/:id', adminOnly, verifyUser, deleteDataSalaryDeduction);
// Salary Data
router.get('/employee_salary_data', viewEmployeeSalaryData);
router.get('/employee_salary_data/name/:name', verifyUser, viewSalaryDataByName);
router.get('/employee_salary_data/month/:month', viewEmployeeSalaryDataByMonth);
router.get('/employee_salary_data/year/:year', viewEmployeeSalaryDataByYear);

/* ==== Reports ==== */
// Employee Salary Report
router.get('/report/salary', verifyUser, adminOnly, viewEmployeeSalaryReport);
router.get('/report/salary/name/:name', verifyUser, adminOnly, viewEmployeeSalaryReportByName);
router.get('/report/salary/month/:month', verifyUser, adminOnly, viewEmployeeSalaryReportByMonth);
router.get('/report/salary/year/:year', verifyUser, adminOnly, viewEmployeeSalaryReportByYear);
// Employee Attendance Report
router.get('/report/attendance/month/:month', verifyUser, adminOnly, viewEmployeeAttendanceReportByMonth);
router.get('/report/attendance/year/:year', verifyUser, adminOnly, viewEmployeeAttendanceReportByYear);
// Pay Slip Report
router.get('/report/pay_slip/name/:name', verifyUser, adminOnly, viewPaySlipByName);
router.get('/report/pay_slip/month/:month', verifyUser, adminOnly, viewPaySlipByMonth);
router.get('/report/pay_slip/year/:year', verifyUser, adminOnly, viewPaySlipByYear);

/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);

// Employee Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, employeeDashboard);
/* ==== Salary Data ==== */
router.get('/employee_salary_data/month/:month', verifyUser, viewSingleEmployeeSalaryByMonth);
router.get('/employee_salary_data/year/:year', verifyUser, viewSingleEmployeeSalaryByYear);
/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);
// ==== kanban Invititation=====
router.get('/employees/invite-employee', getEmailsOfEmployeesInSameDepartment);
/* === send invite ====*/
router.post('/employee/send-invites', sendInvites);
/* ==== Logout ==== */
router.delete('/logout', LogOut);

export default router;
