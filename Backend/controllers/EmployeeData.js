import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import path from "path";

// Displaying all employee data
export const getEmployeeData = async (req, res) => {
    try {
        const response = await EmployeeData.findAll({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'department', 'join_date',
                'status', 'photo', 'access_rights'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Method to retrieve employee data by ID
export const getEmployeeDataByID = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'department', 'username', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that ID not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Method to retrieve employee data by NIK
export const getEmployeeDataByNik = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'department', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                nik: req.params.nik
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that NIK not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Method to retrieve employee data by name
export const getEmployeeDataByName = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'department', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                employee_name: req.params.name
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that name not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Method to add employee data
// export const createEmployeeData = async (req, res) => {
//     const {
//         nik, employee_name,
//         username, password, confPassword, gender,
//         position, department, join_date,
//         status, email, access_rights
//     } = req.body;

//     if (password !== confPassword) {
//         return res.status(400).json({ msg: "Password and Confirm Password do not match" });
//     }
//     console.log(req.files);
//     if (!req.files || !req.files.photo) {
//         return res.status(400).json({ msg: "Failed to upload photo. Please upload the photo again" });
//     }

//     const file = req.files.photo;
//     const fileSize = file.data.length;
//     const ext = path.extname(file.name);
//     const fileName = file.md5 + ext;
//     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//     const allowedTypes = ['.png', '.jpg', '.jpeg'];

//     if (!allowedTypes.includes(ext.toLowerCase())) {
//         return res.status(422).json({ msg: "Photo file does not match the required format" });
//     }

//     if (fileSize > 2000000) {
//         return res.status(422).json({ msg: "Image size must be less than 2 MB" });
//     }

//     file.mv(`./public/images/${fileName}`, async (err) => {
//         if (err) {
//             return res.status(500).json({ msg: err.message });
//         }

//         const hashPassword = await argon2.hash(password);

//         try {
//             await EmployeeData.create({
//                 nik: nik,
//                 employee_name: employee_name,
//                 username: username,
//                 password: hashPassword,
//                 gender: gender,
//                 position: position,
//                 department: department,
//                 join_date: join_date,
//                 status: status,
//                 photo: fileName,
//                 email: email,
//                 url: url,
//                 access_rights: access_rights,
//             });

//             res.status(201).json({ success: true, message: "Registration successful", employee: newEmployee });
//         } catch (error) {
//             console.log(error.message);
//             res.status(500).json({ success: false, message: error.message });
//         }
//     });
// };

export const createEmployeeData = async (req, res) => {
    const {
        nik, employee_name,
        username, password, confPassword, gender,
        position, department, join_date,
        status, email, access_rights
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).json({ msg: "Failed to upload photo. Please upload the photo again" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Photo file does not match the required format" });
    }

    if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Image size must be less than 2 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        const hashPassword = await argon2.hash(password);

        try {
            const newEmployee = await EmployeeData.create({
                nik: nik,
                employee_name: employee_name,
                username: username,
                password: hashPassword,
                gender: gender,
                position: position,
                department: department,
                join_date: join_date,
                status: status,
                photo: fileName,
                email: email,
                url: url,
                access_rights: access_rights,
            });

            res.status(201).json({ success: true, message: "Registration successful", employee: newEmployee });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};


// Method to update employee data
export const updateEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.status(404).json({ msg: "Employee data not found" });
    const {
        nik, employee_name,
        username, gender,
        position, department, join_date,
        status, access_rights
    } = req.body;

    try {
        await EmployeeData.update({
            nik: nik,
            employee_name: employee_name,
            username: username,
            gender: gender,
            position: position,
            department: department,
            join_date: join_date,
            status: status,
            access_rights: access_rights
        }, {
            where: {
                id: employee.id
            }
        });
        res.status(200).json({ msg: "Employee data updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method to update employee password
export const changePasswordAdmin = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.status(404).json({ msg: "Employee data not found" });

    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

    try {
        if (employee.access_rights === "employee") {
            const hashPassword = await argon2.hash(password);

            await EmployeeData.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: employee.id
                    }
                }
            );

            res.status(200).json({ msg: "Employee password updated successfully" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Method to delete employee data
export const deleteEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!employee) return res.status(404).json({ msg: "Employee data not found" });
    try {
        await EmployeeData.destroy({
            where: {
                id: employee.id
            }
        });
        res.status(200).json({ msg: "Employee data deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
