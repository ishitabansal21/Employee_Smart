import {
    getEmployeeSalaryData,
    getAttendanceData,
    viewEmployeeSalaryDataByYear
} from "./TransactionController.js";

// Method to view employee salary report
export const viewEmployeeSalaryReport = async (req, res) => {
    try {
        const salaryReport = await getEmployeeSalaryData(req, res);
        res.status(200).json(salaryReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Method to view employee salary report by month
// export const viewEmployeeSalaryReportByMonth = async (req, res) => {
//     try {
//         const { month } = req.params;
//         const salaryReportByMonth = await getEmployeeSalaryData(req, res);

//         const filteredData = salaryReportByMonth.filter((data) => {
//             return data.month.toLowerCase() === month.toLowerCase();
//         });

//         if (filteredData.length === 0) {
//             res.status(404).json({ msg: 'Data not found' });
//         } else {
//             const formattedData = filteredData.map((data) => {
//                 return {
//                     month: data.month,
//                     employeeName: data.employeeName,
//                     position: data.position,
//                     department: data.department,
//                     baseSalary: data.baseSalary,
//                     transportAllowance: data.transportAllowance,
//                     mealAllowance: data.mealAllowance,
//                     deduction: data.deduction,
//                     totalSalary: data.total
//                 };
//             });
//             res.json(formattedData);
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

export const viewEmployeeSalaryReportByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const salaryReportByMonth = await getEmployeeSalaryData();

        const filteredData = salaryReportByMonth.filter((data) => {
            return String(data.month).toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    employeeName: data.employeeName,
                    position: data.position,
                    department: data.department,
                    baseSalary: data.baseSalary,
                    transportAllowance: data.transportAllowance,
                    mealAllowance: data.mealAllowance,
                    deduction: data.deduction,
                    totalSalary: data.total
                };
            });
            console.log(formattedData);
            res.status(200).json(formattedData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Method to view employee salary report by year
export const viewEmployeeSalaryReportByYear = async (req, res) => {
    try {
        await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Method to view employee salary report by name
export const viewEmployeeSalaryReportByName = async (req, res) => {
    try {
        const salaryReport = await getEmployeeSalaryData(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = salaryReport.filter((data) => {
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

// Method to view employee attendance report by month (using DROP DOWN)
export const viewEmployeeAttendanceReportByMonth = async (req, res) => {
    try {
        const attendanceDataByMonth = await getAttendanceData();
        const { month } = req.params;

        const attendanceData = attendanceDataByMonth.filter((attendance) => attendance.month.toLowerCase() === month.toLowerCase()).map((attendance) => {
            return {
                year: attendance.year,
                month: attendance.month,
                nik: attendance.nik,
                employeeName: attendance.employeeName,
                department: attendance.department,
                present: attendance.present,
                sick: attendance.sick,
                absent: attendance.absent
            };
        });

        if (attendanceData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(attendanceData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Method to view employee attendance report by year
export const viewEmployeeAttendanceReportByYear = async (req, res) => {
    try {
        const attendanceDataByYear = await getAttendanceData();
        const { year } = req.params;

        const attendanceData = attendanceDataByYear.filter((attendance) => attendance.year.toString() === year.toString()).map((attendance) => {
            return {
                year: attendance.year,
                month: attendance.month,
                nik: attendance.nik,
                employeeName: attendance.employeeName,
                department: attendance.department,
                present: attendance.present,
                sick: attendance.sick,
                absent: attendance.absent
            };
        });

        if (attendanceData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(attendanceData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Method to view Employee Pay Slip By Name
export const viewPaySlipByName = async (req, res) => {
    try {
        const salaryReport = await getEmployeeSalaryData(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = salaryReport.filter((data) => {
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
}

// Method to view Employee Pay Slip By Month
export const viewPaySlipByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataSalaryReportByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = dataSalaryReportByMonth.filter((data) => {
            return String(data.month).toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `Data for the month ${month} not found` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    year: data.year,
                    employeeName: data.employeeName,
                    position: data.position,
                    department: data.department,
                    baseSalary: data.baseSalary,
                    transportAllowance: data.transportAllowance,
                    mealAllowance: data.mealAllowance,
                    deduction: data.deduction,
                    totalSalary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Method to view Employee Pay Slip By Year
export const viewPaySlipByYear = async (req, res) => {
    try {
        await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
