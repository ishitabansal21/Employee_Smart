import ChatGroup from '../models/chatGroupModel.js';
import Message from '../models/messageModel.js';
import EmployeeData from '../models/EmployeeDataModel.js';
//import { io } from '../index.js';
import { Op } from 'sequelize';


// Controller function to create a new chat group
export const createChatGroup = async (req, res) => {
    try {
        const { group_name, add_all_users } = req.body;
        const userId = req.session.userId;

        // Fetch the logged-in user to get their department
        const loggedInUser = await EmployeeData.findOne({
            where: { employee_id: userId }
        });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        const department = loggedInUser.department;

        // Fetch all employees belonging to the same department
        let employees;
        if (add_all_users) {
            employees = await EmployeeData.findAll({
                where: {
                    department: department,
                    employee_id: {
                        [Op.ne]: userId
                    }
                }
            });
        } else {
            // If specific users are provided, fetch those users only
            const { specific_users } = req.body;
            if (!Array.isArray(specific_users)) {
                return res.status(400).json({ message: 'Specific users should be provided as an array' });
            }
            employees = await EmployeeData.findAll({
                where: {
                    department: department,
                    id: {
                        [Op.in]: specific_users
                    }
                }
            });
        }
        // Include the creator's employeeId in the list of employees to be added
        employees.push(loggedInUser);


        // Create the chat group and save it to the database
        const newGroup = await ChatGroup.create({ group_name, department });
        console.log('New group:', newGroup);
        console.log(Object.keys(newGroup.__proto__));

        // Add employees to the group
        await newGroup.addEmployee_data(employees);
        console.log('Employees added to group');

        res.status(200).json({ success: true, data: newGroup });
    } catch (error) {
        console.error('Error creating chat group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Controller to add a user to a chat group
export const addUserToGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.session;

        // Find the chat group
        const group = await ChatGroup.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ success: false, error: 'Chat group not found' });
        }

        // Find users belonging to the same department as the logged-in user
        const { department } = req.user;
        const users = await EmployeeData.findAll({
            where: {
                department: department,
                id: {
                    [Op.ne]: req.user.id // Exclude the logged-in user
                }
            }
        });

        // Check if the user to be added exists and belongs to the same department
        const userToAdd = users.find(user => user.id === userId);
        if (!userToAdd) {
            return res.status(404).json({ success: false, error: 'User not found or does not belong to the same department' });
        }

        // Add the user to the chat group
        await group.addUser(userToAdd);

        res.status(200).json({ success: true, message: 'User added to chat group successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to add user to chat group' });
    }
};

// Controller to get all chat groups
// export const getAllChatGroups = async (req, res) => {
//     try {
//         const groups = await ChatGroup.findAll();
//         res.status(200).json({ success: true, data: groups });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: 'Failed to fetch chat groups' });
//     }
// };

export const getAllChatGroups = async (req, res) => {
    try {
        const employeeId = req.session.userId; // Get the employee ID from the session

        // Retrieve chat groups for the employee
        const chatGroups = await ChatGroup.findAll({
            include: [{
                model: EmployeeData,
                where: { employee_id: employeeId } // Filter by employee_id
            }]
        });

        res.status(200).json({ success: true, data: chatGroups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch chat groups' });
   }
};

// export const sendMessage = async (req, res) => {
//     try {
//         const { groupId } = req.params;
//         const { content } = req.body;
//         const sender_id = req.session.userId;

//         // Create the message
//         const newMessage = await Message.create({ content, sender_id, group_id: groupId });

//         // Emit the message to all users in the group
//         io.to(groupId).emit('message', newMessage);
//         res.status(201).json(newMessage);
//     } catch (error) {
//         console.error('Error sending message:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
export const sendMessage = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { content } = req.body;
        const sender_id = req.session.userId;

        // Retrieve the employee_name and photo of the sender
        const sender = await EmployeeData.findOne({
            where: { employee_id: sender_id },
            attributes: ['employee_name', 'photo'] // Retrieve the employee_name and photo
        });

        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        const { employee_name, photo } = sender;

        // Create the message with sender's information
        const newMessage = await Message.create({ content, sender_id: sender_id, employeeName: employee_name, employeePhoto: photo, group_id: groupId });

        // Construct the JSON response including the sender's name and photo
        const messageWithSenderInfo = {
            message_id: newMessage.message_id,
            content: newMessage.content,
            sender_name: sender.employee_name, // Include the sender's name
            sender_photo: sender.photo, // Include the sender's photo
            group_id: newMessage.group_id,
            created_at: newMessage.created_at,
            updated_at: newMessage.updated_at
        };

        // Emit the message to all users in the group
        //io.to(groupId).emit('message', messageWithSenderInfo);

        // Send the JSON response
        res.status(201).json(messageWithSenderInfo);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// export const getGroupMessages = async (req, res) => {
//     try {
//         const { groupId } = req.params;

//         const messages = await Message.findAll({
//             where: { group_id: groupId }
//         });

//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error getting group messages:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Retrieve messages along with sender's information
        const messages = await Message.findAll({
            where: { group_id: groupId }, // Filter messages by group_id
            include: [{
                model: EmployeeData,
                attributes: ['employee_name', 'photo'] // Include only the necessary attributes
            }]
        });

        // Extract sender's name and photo from the included EmployeeData
        const messagesWithSenderInfo = messages.map(message => ({
            message_id: message.message_id,
            content: message.content,
            sender_name: message.employeeName, // Assuming employeeName is the field in Message model
            sender_photo: message.employeePhoto, // Assuming employeePhoto is the field in Message model
            created_at: message.created_at,
            updated_at: message.updated_at
        }));

        res.status(200).json(messagesWithSenderInfo);
    } catch (error) {
        console.error('Error getting group messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getUsersInSameDepartment = async (req, res) => {
    try {
        const userId = req.session.userId;
        console.log('User ID:', userId);

        const loggedInUser = await EmployeeData.findOne({
            where: { employee_id: userId }
        });
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        const department = loggedInUser.department;

        const users = await EmployeeData.findAll({
            where: {
                department: department,
                employee_id: {
                    [Op.ne]: userId
                }
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};