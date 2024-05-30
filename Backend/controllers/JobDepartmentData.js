import JobData from "../models/JobDepartmentDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


// Display all job data
export const getJobData = async (req, res) => {
    try {
        let response;
        if (req.accessRights === "admin") {
            response = await JobData.findAll({
                attributes: ['id', 'department', 'base_salary', 'transport_allowance', 'meal_allowance'],
                include: [{
                    model: EmployeeData,
                    attributes: ['employee_name', 'username', 'access_rights'],
                }]
            });
        } else {
            const job = await JobData.findOne({
                where: {
                    job_id: req.params.id
                }
            });
            if (!job || job.userId !== req.userId) return res.status(403).json({ msg: "Unauthorized access" });

            const { department, base_salary, transport_allowance, meal_allowance } = req.body;
            await JobData.update({
                department, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ job_id: job.job_id }, { userId: req.userId }]
                },
            });

            return res.status(200).json({ msg: "Job data successfully updated" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Retrieve job data by ID
export const getJobDataByID = async (req, res) => {
    try {
        const response = await JobData.findOne({
            attributes: ['id', 'base_salary', 'transport_allowance', 'meal_allowance'],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Job data with that ID not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const createJobData = async (req, res) => {
    const { department, base_salary, transport_allowance, meal_allowance } = req.body;
    console.log(req.accessRights);
    console.log('User ID:', req.userId);

    try {
        if (req.accessRights === "admin") {
            // Admin has full access, create a new job entry
            const job_id = uuidv4();

            await JobData.create({
                job_id: job_id,
                department: department,
                base_salary: base_salary,
                transport_allowance: transport_allowance,
                meal_allowance: meal_allowance,
                user_id: req.userId
            });

            res.status(201).json({ success: true, message: "Job data successfully saved" });
        } else {
            // Non-admin user, handle accordingly (e.g., return an error)
            res.status(403).json({ success: false, message: "Unauthorized access" });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Update job data
export const updateJobData = async (req, res) => {
    try {
        const job = await JobData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!job) return res.status(404).json({ msg: "Data not found" });
        const { department, base_salary, transport_allowance, meal_allowance } = req.body;
        if (req.accessRights === "admin") {
            await JobData.update({
                department, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    id: job.id
                }
            });
        } else {
            if (job.userId !== req.userId) return res.status(403).json({ msg: "Unauthorized access" });
            await JobData.update({
                department, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ job_id: job.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Job data successfully updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Delete job data
export const deleteJobData = async (req, res) => {
    try {
        const job = await JobData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!job) return res.status(404).json({ msg: "Data not found" });
        if (req.accessRights === "admin") {
            await job.destroy({
                where: {
                    id: job.id
                }
            });
        } else {
            if (job.userId !== req.userId) return res.status(403).json({ msg: "Unauthorized access" });
            await job.destroy({
                where: {
                    [Op.and]: [{ job_id: job.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Job data successfully deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get all existing departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await JobData.findAll({
            attributes: ['department'],
            group: ['department']
        });

        const departmentList = departments.map(department => department.department);

        res.status(200).json({ departments: departmentList });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};