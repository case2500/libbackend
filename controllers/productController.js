const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs-extra");

// Create Prouct
const createProduct = async (req, res) => {
  const { name, sku, category, quantity, price, description, isbn } = req.body;
  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    // console.log(req.file.filename);
    fileData = {
      fileName: req.file.filename,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    // user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    isbn,
    description,
    image: fileData,
  });

  res.status(201).json(product);
};

const getProductsPaginator = asyncHandler(async (req, res) => {
  const pageSize = req.query.page_size; //จำนวนข้อมูล
  console.log("pageSize=" + pageSize);
  const pageNumber = +req.query.page || 1;
  console.log("pageNumber=" + pageNumber);
  console.log(req.query.keyword);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const data = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));
  res.json({
    data,
    current_page: pageNumber,
    total: Math.ceil(count / pageSize),
    total_pages: count,
  });
});

// Get all Products
const getProducts = async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
};

// Get all Products
const getIsbn = async (req, res) => {
  // console.log(req.params);
  const findisbn = req.params;
  // console.log(findisbn);
  // const products = await Product.find({"isbn":req.params}), function(err, user)
  Product.find(findisbn, function (err, products) {
    if (err) {
      res.send(err);
    }
    //  console.log(products)
    res.status(200).json(products);
  });
};

// Get single product
const getProduct = async (req, res) => {
  // console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
};

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description, isbn, status } =
    req.body;
  const { id } = req.params;
  const product = await Product.findById(id);
  var newpath =
    path.resolve(__dirname + "/uploads/") + "/" + product.image.fileName;
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  let fileData = {};
  if (req.file) {
    const removePath = newpath.replaceAll("\\controllers", "");
    if (fs.exists(removePath)) {
      await fs.remove(removePath);
    }
    // Save image
    let uploadedFile;
    // console.log(req.file.filename);
    fileData = {
      fileName: req.file.filename,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      status,
      isbn,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getIsbn,
  getProductsPaginator,
};
