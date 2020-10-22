const New = require("../models/New");

const getMany = async (req, res) => {
  const news = await New.find().populate("authorId", "name");

  res.json(news);
};

const addOne = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }

  const { title, content } = req.body;

  const _new = new New({
    title,
    content,
    image: req.file.filename,
    authorId: req.user.id,
  });

  try {
    await _new.save();
    res.json(await New.findById(_new._id).populate("authorId", "name"));
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await New.findByIdAndDelete(id);

  res.json({ success: true });
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  const { title, content } = req.body;
  let image = "";

  if (req.file) {
    image = req.file.filename;
  }

  let dataUpdate = {
    title,
    content,
  };

  if (image) dataUpdate = { image, ...dataUpdate };

  const _new = await New.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });

  res.json(await New.findById(_new._id).populate("authorId", "name"));
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
  updateOne,
};
