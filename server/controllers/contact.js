const Contact = require("../models/Contact");

const addOne = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !email || !message) {
      res.status(500).json({
        errors: [{ field: "field", message: "please fill all field" }],
      });
    }
    await new Contact({
      name,
      phone,
      email,
      message,
    }).save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMany = async (req, res) => {
  const contacts = await Contact.find();

  res.json(contacts);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  addOne,
  getMany,
  deleteOne,
};
