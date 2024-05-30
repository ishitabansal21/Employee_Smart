// import EmployeeData from "../models/EmployeeDataModel.js";
// import AttendanceData from "../models/DataAttendanceModel.js";
// import { getEmployeeSalaryData } from "./TransactionController.js";
// import { verifyUser } from "../middleware/AuthUser.js";
// import { Op } from 'sequelize';
// import { Server } from "socket.io";
// import http from "http";

// // Create an HTTP server
// const server = http.createServer(app);

// // Create a WebSocket server
// const io = new Server(server);

// // Method for employee dashboard
// export const employeeDashboard = async (req, res) => {
//   await verifyUser(req, res, () => { });

//   const userId = req.userId;

//   const response = await EmployeeData.findOne({
//     where: {
//       id: userId
//     },
//     attributes: [
//       'id', 'nik', 'employee_name',
//       'gender', 'position', 'join_date',
//       'status', 'photo', 'access_rights'
//     ]
//   });

//   res.status(200).json(response);
// };

// // Method to view the salary of a single employee by month
// export const viewSingleEmployeeSalaryByMonth = async (req, res) => {
//   await verifyUser(req, res, () => { });

//   const userId = req.userId;
//   const user = await EmployeeData.findOne({
//     where: {
//       id: userId
//     }
//   });

//   try {
//     const employeeSalaryData = await getEmployeeSalaryData();

//     const response = await AttendanceData.findOne({
//       attributes: [
//         'month'
//       ],
//       where: {
//         month: req.params.month
//       }
//     });

//     if (response) {
//       const salaryDataByMonth = employeeSalaryData.filter((salaryData) => {
//         return salaryData.id === user.id && salaryData.month === response.month;
//       }).map((salaryData) => {
//         return {
//           month: response.month,
//           year: salaryData.year,
//           nik: user.nik,
//           employee_name: user.employee_name,
//           gender: user.gender,
//           position: user.position,
//           basic_salary: salaryData.basic_salary,
//           transport_allowance: salaryData.transport_allowance,
//           meal_allowance: salaryData.meal_allowance,
//           deductions: salaryData.deductions,
//           total_salary: salaryData.total,
//         };
//       });
//       return res.json(salaryDataByMonth);
//     }

//     res.status(404).json({ msg: `Salary data for the month of ${req.params.month} not found for employee ${user.employee_name}` });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Method to view the salary of a single employee by year
// export const viewSingleEmployeeSalaryByYear = async (req, res) => {
//   await verifyUser(req, res, () => { });

//   const userId = req.userId;
//   const user = await EmployeeData.findOne({
//     where: {
//       id: userId
//     }
//   });

//   try {
//     const employeeSalaryData = await getEmployeeSalaryData();
//     const { year } = req.params;

//     const salaryDataByYear = employeeSalaryData.filter((salaryData) => {
//       return salaryData.id === user.id && salaryData.year === parseInt(year);
//     }).map((salaryData) => {
//       return {
//         year: salaryData.year,
//         month: salaryData.month,
//         nik: user.nik,
//         employee_name: user.employee_name,
//         gender: user.gender,
//         position: user.position,
//         basic_salary: salaryData.basic_salary,
//         transport_allowance: salaryData.transport_allowance,
//         meal_allowance: salaryData.meal_allowance,
//         deductions: salaryData.deductions,
//         total_salary: salaryData.total,
//       };
//     });

//     if (salaryDataByYear.length === 0) {
//       return res.status(404).json({ msg: `Data for the year ${year} not found` });
//     }
//     res.json(salaryDataByYear);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getEmailsOfEmployeesInSameDepartment = async (req, res) => {
//   await verifyUser(req, res, async () => {
//     const userId = req.userId;
//     const user = await EmployeeData.findOne({
//       where: {
//         id: userId
//       }
//     });

//     if (user.position.toLowerCase() === 'manager') {
//       try {
//         const department = user.department;

//         const employees = await EmployeeData.findAll({
//           where: {
//             department: department,
//             position: { [Op.ne]: 'manager' } // Exclude managers
//           },
//           attributes: ['employee_name', 'email']
//         });

//         const departmentName = department;
//         const employeeDetails = employees.map(employee => ({
//           name: employee.employee_name,
//           email: employee.email
//         }));

//         return res.json({ department: departmentName, employees: employeeDetails });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     } else {
//       return res.status(403).json({ error: 'You are not authorized to access this information.' });
//     }
//   });
// };


import express from 'express'
import Notification from '../models/NotificationModel.js';
import EmployeeData from "../models/EmployeeDataModel.js";
import AttendanceData from "../models/DataAttendanceModel.js";
import { getEmployeeSalaryData } from "./TransactionController.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { Op } from 'sequelize';
//import { Server } from "socket.io";
import http from "http";
import { log } from 'console';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

// const connectedClients = new Map();

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   // When a client connects, store its socket ID
//   socket.on('userId', (userId) => {
//     connectedClients.set(userId, socket.id);
//     console.log(`User ${userId} connected with socket ID: ${socket.id}`);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//     // Remove the client from the map on disconnection
//     connectedClients.forEach((value, key) => {
//       if (value === socket.id) {
//         connectedClients.delete(key);
//       }
//     });
//   });
// });

// Function to notify multiple employees
const notifyEmployees = async (employeeIds, message) => {
  try {
    // Loop through each employee ID
    for (const employeeId of employeeIds) {
      // Check if the employee's socket is connected
      const socketId = connectedClients.get(employeeId);
      if (socketId) {
        // Emit a WebSocket event to notify the employee
        io.to(socketId).emit('notification', { message });
        console.log(`Notification sent to employee ${employeeId}: ${message}`);
      } else {
        // If not connected, store the notification in the database
        await Notification.create({
          userId: employeeId,
          message
        });
        console.log(`Notification stored in the database for employee ${employeeId}: ${message}`);
      }
    }
  } catch (error) {
    console.error('Error notifying employees:', error);
  }
};


// Method for employee dashboard
export const employeeDashboard = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;

  const response = await EmployeeData.findOne({
    where: {
      id: userId
    },
    attributes: [
      'id', 'nik', 'employee_name',
      'gender', 'position', 'department', 'join_date',
      'status', 'photo', 'access_rights'
    ]
  });

  res.status(200).json(response);
};

// Method to view the salary of a single employee by month
export const viewSingleEmployeeSalaryByMonth = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where: {
      id: userId
    }
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();

    const response = await AttendanceData.findOne({
      attributes: [
        'month'
      ],
      where: {
        month: req.params.month
      }
    });

    if (response) {
      const salaryDataByMonth = employeeSalaryData.filter((salaryData) => {
        return salaryData.id === user.id && salaryData.month === response.month;
      }).map((salaryData) => {
        return {
          year: salaryData.year,
          month: salaryData.month,
          nik: user.nik,
          employee_name: user.employee_name,
          gender: user.gender,
          position: user.position,
          department: user.department,
          basic_salary: salaryData.baseSalary,
          transport_allowance: salaryData.transportAllowance,
          meal_allowance: salaryData.mealAllowance,
          deductions: salaryData.deduction,
          total_salary: salaryData.total,
        };
      });
      return res.json(salaryDataByMonth);
    }

    res.status(404).json({ msg: `Salary data for the month of ${req.params.month} not found for employee ${user.employee_name}` });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Method to view the salary of a single employee by year
export const viewSingleEmployeeSalaryByYear = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where: {
      id: userId
    }
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData.filter((salaryData) => {
      return salaryData.id === user.id && salaryData.year === parseInt(year);
    }).map((salaryData) => {
      return {
        year: salaryData.year,
        month: salaryData.month,
        nik: user.nik,
        employee_name: user.employee_name,
        gender: user.gender,
        position: user.position,
        department: user.department,
        basic_salary: salaryData.baseSalary,
        transport_allowance: salaryData.transportAllowance,
        meal_allowance: salaryData.mealAllowance,
        deductions: salaryData.deduction,
        total_salary: salaryData.total,
      };
    });

    if (salaryDataByYear.length === 0) {
      return res.status(404).json({ msg: `Data for the year ${year} not found` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Method to get emails of employees in the same department
export const getEmailsOfEmployeesInSameDepartment = async (req, res) => {
  await verifyUser(req, res, async () => {
    const userId = req.userId;
    const user = await EmployeeData.findOne({
      where: {
        id: userId
      }
    });

    if (user.position.toLowerCase() === 'manager') {
      try {
        const department = user.department;

        const employees = await EmployeeData.findAll({
          where: {
            department: department,
            position: { [Op.ne]: 'manager' } // Exclude managers
          },
          attributes: ['id', 'employee_name', 'email']
        });

        const departmentName = department;
        const employeeDetails = employees.map(employee => ({
          id: employee.id,
          name: employee.employee_name,
          email: employee.email
        }));

        return res.json({ department: departmentName, employees: employeeDetails });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(403).json({ error: 'You are not authorized to access this information.' });
    }
  });
};



export const sendInvites = async (req, res) => {
  await verifyUser(req, res, async () => {
    const { sendToAll, message } = req.body;

    try {
      let employeeDetails = []; // Array to store employee details
      let managerDepartment; // Declare managerDepartment variable

      if (sendToAll) {
        // Fetch the manager's department
        const managerId = req.session.userId;
        const manager = await EmployeeData.findOne({
          where: { employee_id: managerId }
        });

        if (!manager || manager.position.toLowerCase() !== 'manager') {
          return res.status(400).json({ error: 'Invalid managerId provided.' });
        }

        managerDepartment = manager.department; // Assign managerDepartment value

        // Fetch all employees belonging to the manager's department
        const departmentEmployees = await EmployeeData.findAll({
          where: {
            department: managerDepartment,
            position: { [Op.ne]: 'manager' } // Exclude the manager
          }
        });

        // Extract employee IDs from the fetched data
        const employeeIds = departmentEmployees.map(employee => employee.id);

        // Notify all team members via WebSocket or store notification
        await notifyEmployees(employeeIds, message);

        // Mark invite_accepted field as true for all invited employees
        await EmployeeData.update({ invite_accepted: true }, {
          where: {
            id: employeeIds
          }
        });

        // Prepare employee details for response
        employeeDetails = departmentEmployees.map(employee => ({
          employee_id: employee.employee_id,
          employee_name: employee.employee_name,
          username: employee.username,
          gender: employee.gender,
          position: employee.position,
          department: employee.department,
          email: employee.email,
          photo: employee.photo
        }));
      } else {
        // Send invites to selected team members
        const { employeeIds } = req.body;

        if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
          return res.status(400).json({ error: 'Invalid employeeIds provided.' });
        }

        // Fetch manager details
        const managerId = req.session.userId;
        const manager = await EmployeeData.findOne({
          where: { employee_id: managerId }
        });

        if (!manager || manager.position.toLowerCase() !== 'manager') {
          return res.status(400).json({ error: 'Invalid managerId provided.' });
        }

        // Check if the selected employees belong to the manager's department
        const employeesInManagerDepartment = await EmployeeData.findAll({
          where: {
            id: employeeIds,
            department: manager.department
          }
        });
        await notifyEmployees(employeeIds, message);
        // Mark invite_accepted field as true for all invited employees
        await EmployeeData.update({ invite_accepted: true }, {
          where: {
            id: employeeIds
          }
        });

        // Prepare employee details for response
        employeeDetails = employeesInManagerDepartment.map(employee => ({
          employee_id: employee.employee_id,
          employee_name: employee.employee_name,
          username: employee.username,
          gender: employee.gender,
          position: employee.position,
          department: employee.department,
          email: employee.email,
          photo: employee.photo
        }));
      }

      // Return response with employee details
      return res.status(200).json({ message: 'Invites sent successfully.', employeeDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
