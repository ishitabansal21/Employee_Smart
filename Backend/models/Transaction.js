import EmployeeData from './EmployeeDataModel.js';
import JobData from './JobDepartmentDataModel.js';
import AttendanceData from './DataAttendanceModel.js';

/* Method to get Employee Data */

async function getEmployeeData() {
    try {
        const employeeData = await EmployeeData.findAll();
        const employeeDataMap = new Map();
        employeeData.forEach(employee => {
            const { nik, employee_name, job_title } = employee;
            employeeDataMap.set(employee_name, { nik, job_title });
        });

        const resultEmployeeData = [];
        employeeDataMap.forEach(({ nik, job_title }, employee_name) => {
            resultEmployeeData.push({ nik, employee_name, job_title });
        });

        const employeeNames = resultEmployeeData.map(employee => employee.employee_name);
        const employeeNiks = resultEmployeeData.map(employee => employee.nik);
        const jobTitles = resultEmployeeData.map(employee => employee.job_title);

        return { employeeNames, employeeNiks, jobTitles };
    } catch (error) {
        console.log(error);
    }
}

/* Method to get Attendance Data */

async function getAttendanceData() {
    try {
        const attendanceData = await AttendanceData.findAll();
        const attendanceDataMap = new Map();

        const { employeeNames } = await getEmployeeData();
        const { employeeNiks } = await getEmployeeData();

        attendanceData.forEach(attendance => {
            const { nik, month, gender, job_title, present, sick, absent } = attendance;
            const employee_name = employeeNames.find(name => name === attendance.employee_name) || "-";
            const employeeNik = employeeNiks.find(nik => nik === attendance.nik) || "-";
            attendanceDataMap.set(employeeNik, { employee_name, month, gender, job_title, present, sick, absent });
        });

        const resultAttendanceData = [];
        attendanceDataMap.forEach(({ nik, month, gender, job_title, present, sick, absent }, employeeNik) => {
            const employee_name = employeeNames.find(name => name === attendanceDataMap.get(employeeNik).employee_name) || "-";
            resultAttendanceData.push({ employee_name, nik, month, gender, job_title, present, sick, absent });
        });

        console.log(resultAttendanceData);

    } catch (error) {
        console.log(error);
    }
}

getAttendanceData();

/* Method to get Job Data */

async function getJobData() {
    const jobData = await JobData.findAll();
    const jobDataMap = new Map();
    try {
        jobData.forEach(job => {
            const { job_title, basic_salary, transport_allowance, meal_allowance } = job;
            jobDataMap.set(job_title, { basic_salary, transport_allowance, meal_allowance });
        });

        const resultJobData = [];
        jobDataMap.forEach(({ basic_salary, transport_allowance, meal_allowance }, job_title) => {
            resultJobData.push({ job_title, basic_salary, transport_allowance, meal_allowance });
        });

        return resultJobData;
    } catch (error) {
        console.log(error);
    }
}
