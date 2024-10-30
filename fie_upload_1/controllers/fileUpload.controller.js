const cloudinary = require("cloudinary").v2;
const File = require("../models/File.model.js");

const localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);

    const path =
      __dirname + "/files/" + Date.now() + "." + file.name.split(".").pop();

    console.log(path);

    file.mv(path, (err) => console.log(err));

    res.json({ success: true, message: "Local File Uploaded Successfully" });
  } catch (error) {
    console.log("file controller", error);
  }
};

// image upload handler

function isFileTypeSupported(supportedTypes, fileType) {
  return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".").pop().toLowerCase();
    console.log(fileType);

    if (!isFileTypeSupported(supportedTypes, fileType)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    console.log("uploading to first_project");
    const response = await uploadFileToCloudinary(file, "First_Project");
    console.log(response);
    // entry in DB
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "image Successful uploaded",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error("image upload to cloudinary", error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const file = req.files.file;

    // Get file size directly from `file.size`
    const fileSize = file.size; // Size in bytes
    console.log(`File Size: ${fileSize} bytes`);

    // validation
    const supportedTypes = ["mp4", "mov"];

    const fileType = file.name.split(".").pop().toLowerCase();
    console.log(fileType);

    const maxFileSize = 5242880;
    if (fileSize > maxFileSize) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the 5 MB limit",
      });
    }

    if (!isFileTypeSupported(supportedTypes, fileType)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "First_Project");
    console.log(response);

    res.status(200).json({
      success: true,
      message: "Successfully video upload",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    console.error("video upload to cloudinary", error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = { localFileUpload, imageUpload, videoUpload };
