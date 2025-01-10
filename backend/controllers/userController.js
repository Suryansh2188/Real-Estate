import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get all User" })
    }
}
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById({ _id: id }).select('-password');;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get  User" })
    }
}
export const updateUser = async (req, res) => {
    const userId = req.params.id;  // ID from URL params (user to be updated)
    const id = req.userId;        // Authenticated user's ID
    const { password, firstName, lastName, email, about } = req.body; // Extract password, and rest of the fields

    // Authorization: Check if the authenticated user is updating their own profile
    if (id !== userId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        let updateFields = { first_name:firstName, last_name:lastName, email, about }; // Initially set to all fields except password

        // If a password is provided, hash it and add it to the update object
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        // Perform the update
        const userUpdate = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },  // Update only the fields provided
            { new: true }            // Return the updated user document
        );

        // If the user is not found
        if (!userUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    const userId = req.params.id;  // ID from URL params (user to be updated)
    const id = req.userId;         // Authenticated user's ID

    // Authorization: Check if the authenticated user is updating their own profile
    if (id !== userId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete User" })
    }
}


