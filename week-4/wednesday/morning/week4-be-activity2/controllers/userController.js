const User = require("../models/userModel");
const mongoose = require("mongoose");

 // GET /users
 const getAllUsers = async (req, res) => {
    try {
    const users = await User.find({}).sort({ createdAt: -1 });
         res.status(200).json(users);
    } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
 };

// Similarly, implement createUser, getUserById, deleteUser

// POST /users

const createUser = async (req, res) => {
    try {
    const newUser = await User.create({...req.body});
    res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: "Failed to create User", error: error.message});
    }
};

// GET /users/:UserId

const getUserById = async (req, res) => {
    const {UserId} = req.params;

      if (!mongoose.Types.ObjectId.isValid(UserId)) {
        return res.status(400).json({ message: "Invalid User ID" });
      }

  try {  
    const User = await User.findById(UserId);
    if (User) {
        res.status(200).json(User);
    } else {
        res.status(404).json({message: "User not found"});
        }
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve User"});
  }
};


// PUT /users/:UserId

const updateUser = async (req, res) => {
    const {UserId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(UserId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id:UserId},
            {...req.body},
            {new: true}
        );
        if (updatedUser){
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
    res.status(500).json({message: "Failed to update User"});
  }
};


// DELETE /users/:UserId

const deleteUser = async (req, res) => {
    const {UserId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(UserId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const deletedUser = await User.findOneAndDelete({_id:UserId});
        if (deletedUser) {
            res.status(200).json({message: "User deleted succesfully"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to delete User"});
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};