const Product = require('../Models/Product');
const multer = require("multer");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const FILE_TYPE_MAP = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    const uploadPath = "./uploads/product_img";

    if (!isValid) {
      cb(new Error("Invalid file type"));
    } else {
      cb(null, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `IMG-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

const createProduct = (req, res, next) => {
  upload.array('photos', 5)(req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      const files = req.files;
      const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
        desc: req.body.desc,
        address: req.body.address,
        phone: req.body.phone,
        title: req.body.title,
        rating: req.body.rating,
        price: req.body.price,
        photos: files ? files.map((file) => `/uploads/product_img/${file.filename}`) : [],
        comments: [],
        ratings: [],
      });

      try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        next(error);
      }
    }
  });
};

const getProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "No Product Found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAllProduct = async(req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'List of Products',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async(req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, { $set: req.body }, { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json('Product not found');
    }
    res.status(200).json('Product has been deleted');
  } catch (error) {
    next(error);
  }
};

const getProductbyid = async(req, res, next) => {
  try {
    const users = await user.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User',
      data: [users],
    });
  } catch (error) {
    next(error);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const searchTerm = req.query.term;
    const regex = new RegExp(searchTerm, "i");
    const products = await Product.find({ name: regex });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};


const addProductRating = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in the request body
    const value = req.body.value;   // Assuming value is sent in the request body
    const productId = req.body.productId;

    // Create an array to store invalid fields
    const invalidFields = [];

    // Check for missing or invalid data
    if (!userId) {
      invalidFields.push('userId');
    }
    if (!productId) {
      invalidFields.push('productId');
    }
    if (value === null || value === undefined || typeof value !== 'number' || value < 0 || value > 5) {
      invalidFields.push('value');
    }

    // If there are invalid fields, respond with the details
    if (invalidFields.length > 0) {
      return res.status(400).json({ message: `Invalid data: ${invalidFields.join(', ')}` });
    }

    // Fetch the product from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the rating logic
    product.ratings.push({ userId, value });
    const totalRatings = product.ratings.length;
    const sumRatings = product.ratings.reduce((sum, rating) => sum + rating.value, 0);
    product.rating = sumRatings / totalRatings;

    // Save the updated product
    await product.save();

    return res.status(200).json({ message: 'Rating added successfully', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const addProductComment = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.body.userId;
    const text = req.body.text;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.comments.push({ userId, text });
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  getAllProduct,
  getProductbyid,
  updateProduct,
  searchProduct,
  addProductRating,
  addProductComment,
};
