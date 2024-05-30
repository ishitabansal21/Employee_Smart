import DataAttendance from "../models/DataAttendanceModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import PositionData from "../models/JobDepartmentDataModel.js";
import SalaryDeduction from "../models/SalaryDeductionModel.js";
import moment from "moment";
import "moment/locale/id.js";

// // method to display all Data Attendance
export const viewDataAttendance = async (req, res) => {
  let resultDataAttendance = [];
  try {
    // Get attendance data
    const attendanceData = await DataAttendance.findAll({
      attributes: [
        "id",
        "month",
        // "year",
        "nik",
        "employee_name",
        "gender",
        // "position",
        "department",
        "present",
        "sick",
        "absent",
      ],
      distinct: true,
    });

    resultDataAttendance = attendanceData.map((attendance) => {
      const id = attendance.id;
      const createdAt = new Date(attendance.createdAt);
      const year = createdAt.getFullYear();
      const month = attendance.month;
      const nik = attendance.nik;
      const employeeName = attendance.employee_name;
      // const employeePosition = attendance.position;
      const employeeDepartment = attendance.department;
      const gender = attendance.gender;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        id,
        month,
        // year,
        nik,
        employeeName,
        // employeePosition,
        employeeDepartment,
        gender,
        present,
        sick,
        absent,
      };
    });
    res.json(resultDataAttendance);
  } catch (error) {
    console.log(error);
  }
};

// no use for now
// export const viewDataAttendanceByID = async (req, res) => {
//   try {
//     const dataAttendance = await DataAttendance.findOne({
//       attributes: [
//         "id",
//         "month",
//         // "year",
//         "nik",
//         "employee_name",
//         "gender",
//         // "position",
//         "department",
//         "present",
//         "sick",
//         "absent",
//       ],
//       where: {
//         id: req.params.id,
//       }
//     });
//     res.json(dataAttendance);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };


export const createAttendanceData = async (req, res) => {
  const {
    nik,
    employee_name,
    department,
    gender,
    present,
    sick,
    absent,
  } = req.body;

  try {
    // Find employee data by name
    const data_employee_name = await EmployeeData.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    // // Check if employee data not found
    if (!data_employee_name) {
      return res.status(404).json({ msg: "Employee name data not found" });
    }

    const already_existing_name = await DataAttendance.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    if (!already_existing_name) {
      const currentDate = moment().locale("en");
      await DataAttendance.create({
        month: currentDate.format("MMMM").toLowerCase(),
        year: currentDate.year(),
        nik: nik,
        employee_name: data_employee_name.employee_name,
        gender: gender,
        department: department, // Use department from JobData
        present: present,
        sick: sick,
        absent: absent,
      });

      res.json({ msg: "Add Attendance Data Successfully" });
    } else {
      res.status(400).json({ msg: "Name data already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};


// // method to update attendance data
export const updateDataAttendance = async (req, res) => {
  try {
    await DataAttendance.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance data updated successfully" });
  } catch (error) {
    console.log(error.msg);
  }
};

// // method to delete attendance data
export const deleteDataAttendance = async (req, res) => {
  try {
    await DataAttendance.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Delete data successfully" });
  } catch (error) {
    console.log(error.msg);
  }
};

// // method to create salary deduction data
export const createDataSalaryDeduction = async (req, res) => {
  const { id, deduction, amount_deduction } = req.body;
  try {
    const deductionName = await SalaryDeduction.findOne({
      where: {
        deduction: deduction,
      },
    });
    if (deductionName) {
      res.status(400).json({ msg: "Deduction data already exists!" });
    } else {
      await SalaryDeduction.create({
        id: id,
        deduction: deduction,
        amount_deduction: amount_deduction,
      });
      res.json({ msg: "Add Salary Deduction Data Success" });
    }
  } catch (error) {
    console.log(error);
  }
};


// // method to display all Salary Deductions
export const viewDataSalaryDeduction = async (req, res) => {
  try {
    const salaryDeductionData = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "amount_deduction"],
    });
    res.json(salaryDeductionData);
  } catch (error) {
    console.log(error);
  }
};

// // method to display Salary Deduction By ID
export const viewDataSalaryDeductionByID = async (req, res) => {
  try {
    const salaryDeductionData = await SalaryDeduction.findOne({
      attributes: ["id", "deduction", "amount_deduction"],
      where: {
        id: req.params.id,
      },
    });
    res.json(salaryDeductionData);
  } catch (error) {
    console.log(error);
  }
};

// // method to update Salary Deduction
export const updateDataSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Salary Deduction data updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// // method to delete salary deduction data
export const deleteDataSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Delete data successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// Method to retrieve employee salary data (employee data + position data + attendance data + deduction data)

// Method to retrieve employee data:
export const getEmployeeData = async () => {
  let resultEmployeeData = [];

  try {
    // Get employee data:
    const employeeData = await EmployeeData.findAll({
      attributes: ["id", "nik", "employee_name", "gender", "position", "department"],
      distinct: true,
    });

    resultEmployeeData = employeeData.map((employee) => {
      const id = employee.id;
      const nik = employee.nik;
      const employeeName = employee.employee_name;
      const gender = employee.gender;
      const employeePosition = employee.position;
      const employeeDepartment = employee.department;

      return { id, nik, employeeName, gender, employeePosition, employeeDepartment };
    });
  } catch (error) {
    console.error(error);
  }

  return resultEmployeeData;
};

// Method to retrieve position data:
export const getPositionData = async () => {
  let resultPositionData = [];

  try {
    // Get position data:
    const positionData = await PositionData.findAll({
      attributes: ["department", "base_salary", "transport_allowance", "meal_allowance"],
      distinct: true,
    });

    resultPositionData = positionData.map((pos) => {
      const departmentName = pos.department;
      const baseSalary = pos.base_salary;
      const transportAllowance = pos.transport_allowance;
      const mealAllowance = pos.meal_allowance;

      return { departmentName, baseSalary, transportAllowance, mealAllowance };
    });
  } catch (error) {
    console.error(error);
  }

  return resultPositionData;
};

// Method to retrieve attendance data:
export const getAttendanceData = async () => {
  try {
    // Get attendance data:
    const attendanceData = await DataAttendance.findAll({
      attributes: [
        "month",
        "nik",
        "employee_name",
        "gender",
        "department",
        "present",
        "sick",
        "absent",
        "created_at"
      ],
      distinct: true,
    });

    const resultAttendanceData = attendanceData.map((attendance) => {
      const createdAt = new Date(attendance.created_at);
      const year = createdAt.getFullYear();
      const month = attendance.month;
      const nik = attendance.nik;
      const employeeName = attendance.employee_name;
      const employeeDepartment = attendance.department;
      const gender = attendance.gender;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        year,
        month,
        nik,
        employeeName,
        employeeDepartment,
        gender,
        present,
        sick,
        absent,
      };
    });

    return resultAttendanceData;
  } catch (error) {
    console.error(error);
  }
};

// Method to retrieve deduction data:
export const getDeductionData = async () => {
  let resultDeductionData = [];

  try {
    // Get deduction data:
    const deductionData = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "amount_deduction"],
      distinct: true,
    });

    resultDeductionData = deductionData.map((ded) => {
      const id = ded.id;
      const deductionName = ded.deduction;
      const deductionAmount = ded.amount_deduction;

      return { id, deductionName, deductionAmount };
    });
  } catch (error) {
    console.error(error);
  }
  console.log(resultDeductionData);
  return resultDeductionData;
};

// Mathematical Logic
export const getEmployeeSalaryData = async () => {
  try {
    // Employee Salary:
    const resultEmployeeData = await getEmployeeData();
    const resultPositionData = await getPositionData();

    const employeeSalary = resultEmployeeData
      .filter((employee) =>
        resultPositionData.some(
          (department) => department.department === employee.department
        )
      )
      .map((employee) => {
        const department = resultPositionData.find(
          (department) => department.department === employee.department
        );
        console.log("Employee Object:", employee);
        return {
          id: employee.id,
          nik: employee.nik,
          employeeName: employee.employeeName,
          position: employee.employeePosition,
          department: employee.employeeDepartment,
          baseSalary: department.baseSalary,
          transportAllowance: department.transportAllowance,
          mealAllowance: department.mealAllowance,
        };
      });

    // Employee Deduction:
    const resultAttendanceData = await getAttendanceData();
    const resultDeductionData = await getDeductionData();

    const deductionEmployee = resultAttendanceData.map((attendance) => {
      const deductionAbsent = attendance.absent > 0 ?
        resultDeductionData
          .filter((ded) => ded.deductionName.toLowerCase() === "absent")
          .reduce((total, ded) => total + ded.deductionAmount * attendance.absent, 0) : 0;
      console.log(resultDeductionData);

      const deductionSick = attendance.sick > 0 ?
        resultDeductionData
          .filter((ded) => ded.deductionName.toLowerCase() === "sick")
          .reduce((total, ded) => total + ded.deductionAmount * attendance.sick, 0) : 0;

      console.log(deductionSick);

      return {
        year: attendance.year,
        month: attendance.month,
        employeeName: attendance.employeeName,
        present: attendance.present,
        sick: attendance.sick,
        absent: attendance.absent,
        deductionSick: deductionSick,
        deductionAbsent: deductionAbsent,
        totalDeduction: deductionSick + deductionAbsent
      };
    });
    console.log(resultDeductionData);

    // Total Employee Salary:
    const totalEmployeeSalary = employeeSalary.map((employee) => {
      const id = employee.id;
      const attendance = resultAttendanceData.find(
        (attendance) => attendance.employeeName === employee.employeeName
      );
      const deduction = deductionEmployee.find(
        (deduction) => deduction.employeeName === employee.employeeName
      );
      const totalSalary =
        (employee.baseSalary +
          employee.transportAllowance +
          employee.mealAllowance -
          (deduction ? deduction.totalDeduction : 0)).toLocaleString();

      return {
        year: deduction ? deduction.year : attendance ? attendance.year : 0,
        month: deduction ? deduction.month : attendance ? attendance.month : 0,
        id: id,
        nik: employee.nik,
        employeeName: employee.employeeName,
        position: employee.position,
        department: employee.department,
        baseSalary: employee.baseSalary.toLocaleString(),
        transportAllowance: employee.transportAllowance.toLocaleString(),
        mealAllowance: employee.mealAllowance.toLocaleString(),
        // present: attendance.present,
        // sick: attendance.sick,
        // absent: attendance.absent,
        deduction: deduction ? deduction.totalDeduction.toLocaleString() : 0,
        total: totalSalary,
      };
    });
    // console.log(totalEmployeeSalary);
    return totalEmployeeSalary;
  } catch (error) {
    console.error(error);
  }
};

// Method to view employee salary data
export const viewEmployeeSalaryData = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    console.log(employeeSalaryData);
    res.status(200).json(employeeSalaryData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Method to view employee salary data by name
export const viewEmployeeSalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { name } = req.params;

    const salaryDataByName = employeeSalaryData
      .filter((salaryData) => {
        return salaryData.employeeName
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((salaryData) => {
        return {
          year: salaryData.year,
          month: salaryData.month,
          id: salaryData.id,
          nik: salaryData.nik,
          employeeName: salaryData.employeeName,
          position: salaryData.position,
          department: salaryData.department,
          baseSalary: salaryData.baseSalary,
          transportAllowance: salaryData.transportAllowance,
          mealAllowance: salaryData.mealAllowance,
          totalSalary: salaryData.total,
        };
      });

    if (salaryDataByName.length === 0) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    return res.json(salaryDataByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Method to view employee salary data by ID
export const viewEmployeeSalaryDataById = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const id = parseInt(req.params.id);

    const foundData = employeeSalaryData.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Method to view employee salary data by name
export const viewSalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const name = req.params.name.toLowerCase();

    const foundData = employeeSalaryData.filter((data) => {
      const formattedName = data.employeeName.toLowerCase();
      const searchKeywords = name.split(" ");

      return searchKeywords.every((keyword) => formattedName.includes(keyword));
    });

    if (foundData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Method to view employee salary data by month
export const viewEmployeeSalaryDataByMonth = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const response = await DataAttendance.findOne({
      attributes: ["month"],
      where: {
        month: req.params.month,
      },
    });

    if (response) {
      const salaryDataByMonth = employeeSalaryData
        .filter((salaryData) => {
          return salaryData.month === response.month;
        })
        .map((salaryData) => {
          return {
            month: response.month,
            id: salaryData.id,
            nik: salaryData.nik,
            employeeName: salaryData.employeeName,
            position: salaryData.position,
            department: salaryData.department,
            baseSalary: salaryData.baseSalary,
            transportAllowance: salaryData.transportAllowance,
            mealAllowance: salaryData.mealAllowance,
            totalSalary: salaryData.total,
          };
        });
      return res.json(salaryDataByMonth);
    }

    res
      .status(404)
      .json({ msg: `Data for the month ${req.params.month} not found` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Method to view employee salary data by year
export const viewEmployeeSalaryDataByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salaryData) => {
        const salaryYear = salaryData.year;
        return salaryYear === parseInt(year);
      })
      .map((salaryData) => {
        return {
          year: salaryData.year,
          id: salaryData.id,
          nik: salaryData.nik,
          employeeName: salaryData.employeeName,
          position: salaryData.position,
          department: salaryData.department,
          present: salaryData.present,
          sick: salaryData.sick,
          absent: salaryData.absent,
          baseSalary: salaryData.baseSalary,
          transportAllowance: salaryData.transportAllowance,
          mealAllowance: salaryData.mealAllowance,
          deduction: salaryData.deduction,
          totalSalary: salaryData.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data for the year ${year} not found` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Method to view employee salary report by year
export const salaryReportByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salaryData) => {
        const salaryYear = salaryData.year;
        return salaryYear === parseInt(year);
      })
      .map((salaryData) => {
        return {
          year: salaryData.year,
          id: salaryData.id,
          nik: salaryData.nik,
          employeeName: salaryData.employeeName,
          gender: salaryData.gender,
          position: salaryData.position,
          department: salaryData.department,
          baseSalary: salaryData.baseSalary,
          transportAllowance: salaryData.transportAllowance,
          mealAllowance: salaryData.mealAllowance,
          deduction: salaryData.deduction,
          totalSalary: salaryData.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data for the year ${year} not found` });
    } else {
      const reportByYear = salaryDataByYear.map((data) => data.year)
      console.log(reportByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};