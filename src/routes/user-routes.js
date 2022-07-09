import { Router } from "express";
import {
  userRegister,
  loginUser,
  userProfile,
  changePassword,
} from "../apis/user-apis.js";

import { userAuth } from "../middlewares/auth-guard.js";

const router = Router();

/**
 * @description To create a new User Account
 * @api /users/api/register-user
 * @access Public
 * @type POST
 */
router.post("/register-user", async (req, res) => {
  await userRegister(req, res);
});

/**
 * @description To authenticate an user and get auth token
 * @api /users/api/authenticate
 * @access PUBLIC
 * @type POST
 */

router.post("/authenticate", async (req, res) => {
  await loginUser(req, res);
});

/**
 * @description To change password
 * @api /users/api/change-password
 * @access Public
 * @type POST
 */
router.put("/change-password", userAuth, async (req, res) => {
  await changePassword(req, res);
});

/**
 * @description To get the authenticated user's profile
 * @api /users/api/authenticate/account
 * @access Private
 * @type GET
 */

router.get("/api/authenticate/account", userAuth, async (req, res) => {
  await userProfile(req.user, res);
});

export default router;
