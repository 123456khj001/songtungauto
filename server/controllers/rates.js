const Rate = require("../models/Rate");

const getMany = async (req, res) => {
  const rates = await Rate.find()
    .populate("userId", ["name", "username"])
    .populate("productId", ["name", "images"]);
  res.json(rates);
};

const addOne = async (req, res) => {
  const { star, description, productId } = req.body;

  const newRate = new Rate({
    userId: req.user.id,
    productId,
    star,
    description: description ? description : null,
  });

  try {
    await newRate.save();
    res.json(newRate);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Rate.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
