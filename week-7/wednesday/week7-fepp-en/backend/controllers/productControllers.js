const Product = require("../models/productModel");
const mongoose = require("mongoose");

//GET / products;
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};


// POST /products
const createProduct = async (req, res) => {
   try {
    const user_id = req.user._id;
    const newProduct = new Product({ ...req.body, user_id });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      console.error("Error creating product:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// GET /products/:productId
const getProductById = async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" })
    } 
    res.status(200).json(product);
    } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// PUT /products/:productId
const updateProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { ...req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server Error" });
  }
};  

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: "Product not found" });
  }
  
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } res.status(204).send();
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Server Error" });
  } 
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
