const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs-extra");

// Create Member
const createMember = async (req, res) => {
  const { name, bio, classroom, phone, status } = req.body;
  // console.log(req.body);
  // console.log(req.file);
  // Handle Image upload
  try {
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      // console.log(req.file.filename);
      fileData = {
        fileName: req.file.filename,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  
    // Create Member
    const member = await Member.create({
      // user: req.user.id,
      name,
      bio,
      classroom,
      phone,
      status,
      image: fileData,
    });
  
    res.status(201).json({msg:"success"});
  } catch (error) {
    res.status(401).json({msg:"error"})
  }
 
};

// Get all Members
const getMembers = async (req, res) => {
  const members = await Member.find().sort("-createdAt");
  res.status(200).json(members);
};

// Get single member
const getMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  }
  res.status(200).json(member);
};

// Delete member
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  }
  var newpath =
  path.resolve(__dirname + "/uploads/") + "/" + member.image.fileName;
  const removePath = newpath.replaceAll("\\controllers", "");
  if (fs.exists(removePath)) {
    await fs.remove(removePath);
  }
  await member.remove();
  res.status(200).json({ message: "member deleted." });
});

// Update Member
const updateMember = asyncHandler(async (req, res) => {
  const { name, bio, classroom, phone, status } = req.body;
  const { id } = req.params;
  // console.log(req.body);
  const member = await Member.findById(id);
  var newpath =
    path.resolve(__dirname + "/uploads/") + "/" + member.image.fileName;
  if (!member) {
    res.status(404);
    throw new Error("member not found");
  }
  // Handle Image upload
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
  // Update Member
  // console.log(id);
  const updatedMember = await Member.findByIdAndUpdate(
    { _id: id },
    {
      name,
      bio,
      classroom,
      phone,
      status,
      image: Object.keys(fileData).length === 0 ? member?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedMember);
});

module.exports = {
  createMember,
  getMembers,
  getMember,
  deleteMember,
  updateMember,
};
