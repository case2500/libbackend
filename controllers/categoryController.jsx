const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs-extra");

// Create Prouct
const createCategory = async (req, res) => {
  const { name, status, description } = req.body;
  // console.log("req.file="+req.file);
  let fileData = {};
  if (req.file) {
    // console.log(req.file.filename);
    fileData = {
      fileName: req.file.filename,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }else{
 
    fileData = {
      fileName: noimage.png,
      // fileSize: fileSizeFormatter(req.file.size, 2),
  }
  // Create Product
  const category = await Category.create({
    // user: req.user.id,
    name,
    status,
    description,
    image: fileData,
  });
  res.status(201).json(category);
};
}
// Get all Products
const getCategories = async (req, res) => {
  const categories = await Category.find().sort("-createdAt");
  res.status(200).json(categories);
};

// Get single product
const getCategory = async (req, res) => {
  // console.log(req.params.id);
  const category = await Category.findById(req.params.id);
  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("category not found");
  }
  // Match category to its user
  // if (category.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json(category);
};

// Delete Product
const deleteCategory = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const category = await Category.findById(req.params.id);
  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("category not found");
  }
  // Match category to its user
  // if (category.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await category.remove();
  res.status(200).json({ message: "category deleted." });
});

// Update Product
const updateCategory = async (req, res) => {
  const { name, status, description } = req.body;
  //   const { name, status, description,_id } = req.body;
  //   const { id } = req.params.id;
  // console.log("req.body.id="+req.params.id)
  // console.log("req.body="+name)
  const category = await Category.findById(req.params.id);
  // console.log("category.image.fileName"+category.image.fileName);

  var newpath =
    path.resolve(__dirname + "/uploads/") + "/" + category.image.fileName;

  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("category not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    //remove folder controllers =>newpath
    const removePath = newpath.replaceAll("\\controllers", "");
    // console.log("removePath=" + removePath);
    if (fs.exists(removePath)) {
      await fs.remove(removePath);
    }

    // Save image
    let uploadedFile;
    // console.log("req.file.filename" + req.file.filename);
    fileData = {
      fileName: req.file.filename,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Category
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      description,
      image: Object.keys(fileData).length === 0 ? category?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCategory);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
}
