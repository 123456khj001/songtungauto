const argon2 = require("argon2");

const User = require("../models/User");

const { authValidation } = require("../validation");

const getMany = async (req, res) => {
  try {
    let { $limit, $skip, $sort } = req.query;

    const users = await User.find({ $nor: [{ _id: req.user.id }] })
      .sort({ createdAt: $sort || -1 })
      .skip($skip || 0)
      .limit($limit || 10);

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addOne = async (req, res) => {
  try {
    if (req.body.role !== "user" && req.user.role !== "super-admin") {
      return res.status(400).json({
        errors: [{ field: "authorized", message: "Not allowed to do that" }],
      });
    }

    const { isValid, errors } = authValidation.register(req.body);
    if (!isValid) return res.status(400).json({ errors: errors });
    else {
      const {
        name,
        username,
        password,
        role,
        birthday,
        gender,
        address,
      } = req.body;
      const userByUsername = await User.findOne({ username });

      if (!userByUsername) {
        const hashPassword = await argon2.hash(password);

        const newUser = new User({
          name,
          username,
          password: hashPassword,
          role,
          birthday: new Date(birthday),
          gender,
          address,
        });
        await newUser.save();

        res.json(newUser);
      } else {
        res.status(400).json({
          errors: [{ field: "username", message: "user already exists" }],
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const userById = await User.findById(id);

    if (userById && userById.role === "user") {
      await User.findByIdAndDelete(id);
      res.json({ success: true });
    } else if (userById && userById !== "user") {
      if (req.user.role === "super-admin") {
        await User.findByIdAndDelete(id);
        res.json({ success: true });
      } else {
        return res.status(400).json({
          errors: [{ field: "authorized", message: "Not allowed to do that" }],
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
