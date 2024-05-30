import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import { verifyUser } from "../middleware/AuthUser.js";

export const Login = async (req, res) => {
  let user = {};
  const employee = await EmployeeData.findOne({
    where: {
      username: req.body.username
    }
  });

  if (!employee) {
    return res.status(404).json({ msg: "Employee Data Not Found" });
  }

  const match = await argon2.verify(employee.password, req.body.password);
  console.log(match);

  if (!match) {
    return res.status(400).json({ msg: "Incorrect Password" });
  }

  req.session.userId = employee.employee_id;

  user = {
    id_employee: employee.id,
    employee_name: employee.employee_name,
    username: employee.username,
    access_rights: employee.access_rights
  }

  res.status(200).json({
    id_employee: user.id_employee,
    employee_name: user.employee_name,
    username: user.username,
    access_rights: user.access_rights,
    msg: "Login Successful"
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please Login to Your Account!" });
  }
  const employee = await EmployeeData.findOne({
    attributes: ['id', 'nik', 'employee_name', 'username', 'access_rights','department','position','gender'], //added by ishita
    where: {
      employee_id: req.session.userId
    }
  });
  if (!employee) return res.status(404).json({ msg: "User Not Found" });
  res.status(200).json(employee);
}

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Unable to logout" });
    res.status(200).json({ msg: "You have been logged out" });
  });
}

export const changePassword = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;
  console.log(`userId is: ${userId}`);

  const user = await EmployeeData.findOne({
    where: {
      id: userId
    }
  });

  console.log(user);
  const { password, confPassword } = req.body;

  if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

  try {
    const hashPassword = await argon2.hash(password);

    await EmployeeData.update(
      {
        password: hashPassword
      },
      {
        where: {
          id: user.id
        }
      }
    )
    res.status(200).json({ msg: "Password Successfully Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
