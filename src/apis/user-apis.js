import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
const { hash } = bcryptjs;
/**
 * @description To create a new User
 * @api /users/api/register-user
 * @access Public
 * @type POST
 */
export const userRegister = async (req, res) => {
  try {
    let { username, email } = req.body;
    // Check if the username is taken or not
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken.",
      });
    }
    // Check if the user exists with that email
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "Email is already registered. Did you forget the password. Try resetting it.",
      });
    }

    user = new User({
      ...req.body,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Hurray! your account is created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

/**
 * @description To authenticate an user and get auth token
 * @api /users/api/authenticate
 * @access PUBLIC
 * @type POST
 */
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found.",
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      accessToken: token,
      message: "Hurray! You are now logged in.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

/**
 * @description To get the authenticated user's profile
 * @api /users/api/authenticate/account
 * @access Private
 * @type GET
 */
export const userProfile = async (user, res) => {
  return res.status(200).json({
    user,
  });
};

/**
 * @description To change user pass
 * @api /users/api/change-password
 * @access PUBLIC
 * @type PUT
 */
export const changePassword = async (req, res) => {
  try {
    let { newPass, currentPass } = req.body;
    // let { _id } = req.user;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!(await user.comparePassword(currentPass))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password.",
      });
    }

    let hashPass = (user.password = await hash(newPass, 10));
    user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        password: hashPass,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      user,
      message: "Password change successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};
