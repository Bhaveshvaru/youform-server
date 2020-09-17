const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const ImageModel = require('../models/ImageModel');

router.get('/', (req, res, next) => {
  ImageModel.find()
    .select('description _id productImage')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        images: docs.map((doc) => {
          return {
            description: doc.description,
            productImage: doc.productImage,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', upload.single('productImage'), (req, res, next) => {
  const image = new ImageModel({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    productImage: req.file.path,
  });
  image
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Image added successfully',
        createdProduct: {
          description: result.description,
          _id: result._id,
          productImage: result.productImage,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
