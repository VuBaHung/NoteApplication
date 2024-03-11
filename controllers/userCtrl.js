const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userCtrl = {
  getUsers: async (req, res) => {
    try {
      const user = await Users.find();
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) return res.status(400).json({ msg: "Email already exist" });
      hashPW();
      function hashPW() {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) throw new Error(error.message);

          const newUser = new Users({
            username: username,
            email: email,
            password: hash,
          });
          newUser.save();
          res.json({ msg: "Register Success!" });
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "Email does not exist" });
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw Error("Login error!");
        //create a token
        if (isMatch) {
          const payload = { id: user._id, name: user.username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
          });

          res.json(token);
        } else {
          res.status(500).json({ msg: "Password is not correct!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(fasle);
        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);
        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
