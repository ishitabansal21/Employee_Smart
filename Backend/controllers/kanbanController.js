import EmployeeData from "../models/EmployeeDataModel.js";

// Function to check if the user is invited
const checkInvitation = async (userId) => {
    try {
        const user = await EmployeeData.findOne({
            where: { employee_id: userId }
        });

        return user && user.invite_accepted === true;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking invitation.');
    }
};

// Controller function to handle accessing the kanban board
export const accessKanbanBoard = async (req, res) => {
    try {
        const { userId } = req.session;

        const user = await EmployeeData.findOne({
            where: { employee_id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.position.toLowerCase() === 'manager') {
            return res.status(200).json({ message: 'Welcome to the kanban board!' });
        } else {
            const isInvited = await checkInvitation(userId);

            if (isInvited) {
                return res.status(200).json({ message: 'Welcome to the kanban board!' });
            } else {
                return res.status(403).json({ message: 'You are not invited to access the kanban board yet by your manager.' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
