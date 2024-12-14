var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const sceret = "secretkey";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/singUp", async (req, res) => {
  let { name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({
      success: false,
      msg: "Email alrady exists !"
    });
  }
  else {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          name: name,
          email: email,
          password: hash
        });

        return res.json({
          success: true,
          msg: "User created successfully !",
        })
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found !"
    });
  }
  else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id, email: user.email }, sceret);
        return res.json({
          success: true,
          msg: "User logged in successfully !",
          token: token
        });
      }
      else {
        return res.json({
          success: false,
          msg: "Password is incorrect !"
        })
      }
    })
  }
});

router.post("/authencateUser", async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, sceret);
    let user = await userModel.findOne({ _id: decoded.userId });
    if (user) {
      return res.json({
        success: true,
        msg: "User is authenticated !",
      });
    }
    else {
      return res.json({
        success: false,
        msg: "User not found !",
        action: "logout"
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      msg: "User not found !",
      actionL: "logout"
    })
  }
})

module.exports = router;
