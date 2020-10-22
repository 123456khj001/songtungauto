const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { authValidation } = require("../validation");

const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.register(req.body);
    if (!isValid) return res.status(400).json({ errors: errors });
    else {
      const { name, username, password, birthday, gender, address } = req.body;
      const userByUsername = await User.findOne({ username });

      if (!userByUsername) {
        const hashPassword = await argon2.hash(password);

        const newUser = new User({
          name,
          username,
          password: hashPassword,
          birthday: !!birthday ? new Date(birthday) : new Date().now,
          gender: !!gender ? gender : "male",
          address,
        });
        await newUser.save();

        res.json({ newUser });
      } else {
        return res.status(400).json({
          errors: [{ field: "username", message: "user already exists" }],
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.login(req.body);
    if (!isValid) return res.status(400).json({ errors: errors });
    else {
      const { username, password } = req.body;

      const userByUsername = await User.findOne({ username });

      if (userByUsername) {
        const matchPassword = await argon2.verify(
          userByUsername.password,
          password
        );
        if (matchPassword) {
          const {
            _id,
            name,
            username,
            birthday,
            gender,
            address,
            role,
          } = userByUsername;
          const payload = {
            id: _id,
            name,
            username,
            birthday,
            gender,
            address,
            role,
          };
          const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
            expiresIn: "24h",
          });

          res.json({ token: `Bearer ${token}` });
        } else {
          return res.status(400).json({
            errors: [{ field: "password", message: "password incorrect" }],
          });
        }
      } else {
        return res.status(400).json({
          errors: [{ field: "username", message: "username is not exists" }],
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  login,
  register,
};
