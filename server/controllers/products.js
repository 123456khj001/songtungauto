const Product = require("../models/Product");

/**
 * get all products
 * @param {limit, offset} req
 * @param {*} res
 */
const getMany = async (req, res) => {
  const { limit, offset, isOld } = req.query;
  let conditions = {};

  if (typeof isOld !== "undefined") {
    // get all old products
    if (isOld == "true") {
      conditions = { ...{ isOld: true } };

      //get all new products
    } else if (isOld == "false") {
      conditions = { ...{ isOld: false } };
    }
  }

  const products = await Product.find(conditions)
    .sort({ _id: -1 })
    .limit(limit ? parseInt(limit) : 0)
    .skip(offset ? parseInt(offset) : 0)
    .populate("brandId", "name");

  res.json(products);
};

/**
 * add a new brand
 * @param {name, description, image, brandId, isNew} req
 * @param {*} res
 */
const addOne = async (req, res) => {
  if (req.files.length === 0) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }
  const { name, description, brandId, isOld, origin, year } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }
  if (!description) {
    return res.status(400).json({
      errors: [
        { field: "description", message: "description field is required" },
      ],
    });
  }
  if (!brandId) {
    return res.status(400).json({
      errors: [{ field: "brandId", message: "brand field is required" }],
    });
  }

  let images = [];
  req.files.forEach((file) => {
    images = [file.filename, ...images];
  });

  const newProduct = new Product({
    name,
    brandId,
    description,
    images,
    isOld: isOld ? isOld : false,
    origin,
    year,
  });

  try {
    await newProduct.save();
    const product = await Product.findById(newProduct._id).populate(
      "brandId",
      "name"
    );
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

/**
 * delete a product by id
 * @param {id} req
 * @param {*} res
 */
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.json({ success: true });
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  const { name, description, brandId, isOld, origin, year } = req.body;
  let images = [];

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      images = [file.filename, ...images];
    });
  }

  let dataUpdate = {
    name,
    description,
    brandId,
    isOld,
    origin,
    year,
  };

  if (images.length > 0) dataUpdate = { images, ...dataUpdate };

  const product = await Product.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });

  const _product = await Product.findById(product._id).populate(
    "brandId",
    "name"
  );

  res.json(_product);
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
  updateOne,
};
