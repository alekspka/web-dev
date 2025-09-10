const express = require("express");
const router = express.Router();
const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog

} = require("../controllers/blogController");
 
// GET /cars
router.get("/", getAllBlogs);

// POST /cars
router.post("/", createBlog);

// GET /cars/:blogId
router.get("/:blogId", getBlogById);

// PUT /cars/:blogId
router.put("/:blogId", updateBlog);

// DELETE /cars/:blogId
router.delete("/:blogId", deleteBlog);


module.exports = router;