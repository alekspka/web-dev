const Product = require("../models/productModel");
const mongoose = require("mongoose");

//GET / products;
const getAllProducts = async (req, res) => {
  res.send("getAllProducts");
};

// POST /products
const createProduct = async (req, res) => {
  res.send("createProduct");
};

// GET /products/:productId
const getProductById = async (req, res) => {
  res.send("getProductById");
};

// PUT /products/:productId
const updateProduct = async (req, res) => {
  res.send("updateProduct");
};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
  res.send("deleteProduct");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
