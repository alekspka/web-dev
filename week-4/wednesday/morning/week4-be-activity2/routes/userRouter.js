const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser

} = require("../controllers/userController");
 
// GET /cars
router.get("/", getAllUsers);

// POST /cars
router.post("/", createUser);

// GET /cars/:User/Id
router.get("/:UserId", getUserById);

// PUT /cars/:User/Id
router.put("/:UserId", updateUser);

// DELETE /cars/:User/Id
router.delete("/:UserId", deleteUser);


module.exports = router;