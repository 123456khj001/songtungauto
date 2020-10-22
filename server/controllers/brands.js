const Brand = require("../models/Brand");
const Product = require("../models/Product");

/**
 * get all brands
 * @param {*} req
 * @param {*} res
 */
const getMany = async (req, res) => {
  const brands = await Brand.find();

  res.json(brands);
};

/**
 * add a new brand
 * @param {name, description} req
 * @param {*} res
 */
const addOne = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }

  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }

  const newBrand = new Brand({
    name,
    description: description ? description : null,
    image: req.file.filename,
    slug: name.split(" ").join("-"),
  });

  try {
    await newBrand.save();
    res.json(newBrand);
  } catch (err) {
    console.log(err);
    if (err.message.includes("`slug` is required.")) {
      return res.status(400).json({
        errors: [{ field: "name", message: "name already exists" }],
      });
    }
    return res.status(400).json(err);
  }
};

/**
 * delete a brand by id
 * @param {id} req
 * @param {*} res
 */
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Brand.findByIdAndDelete(id);

  res.json({ success: true });
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  const { name, description } = req.body;
  let image = "";

  if (req.file) {
    image = req.file.filename;
  }

  let dataUpdate = {
    name,
    description,
  };

  if (image) dataUpdate = { image, ...dataUpdate };

  const brand = await Brand.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });

  const _brand = await Brand.findById(brand._id).populate("brandId", "name");

  res.json(_brand);
};

const getManyBySlug = async (req, res) => {
  const { slug } = req.params;

  const products = await Product.find({ slug });
  res.json(products);
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
  getManyBySlug,
  updateOne,
};
