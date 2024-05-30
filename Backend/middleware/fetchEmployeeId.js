
const fetchEmployeeId = (req, res, next) => {
    // Assuming the employee ID is stored in the session
    console.log(req.session.employee_id);
    req.employeeId = req.session.employee_id;
    console.log(`Employee ID: ${req.employeeId}`);
    next();
};

export default fetchEmployeeId;
