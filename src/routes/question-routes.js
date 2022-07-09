import { Router } from "express";
import { userAuth } from "../middlewares/auth-guard.js";
import {
  createQuestion,
  getQuestions,
  todaysQuestions,
  totalQuestions,
} from "../apis/qusetion-apis.js";

const router = Router();

/**
 * @description To CREATE A NEW QUESTION
 * @api /questions/api
 * @access Public
 * @type POST
 */
router.post("/", async (req, res) => {
  await createQuestion(req, res);
});

/**
 * @description TO GET ALL QUESTIONS
 * @api /questions/api/
 * @access Private
 * @type GET
 */
router.get("/",  async (req, res) => {
  await getQuestions(req, res);
});

/**
 * @description TO GET TOTAL QUESTIONS
 * @api /questions/api/total-questions
 * @access Private
 * @type GET
 */
router.get("/total-questions",  async (req, res) => {
  await totalQuestions(req, res);
});

/**
 * @description TO GET TODAYS QUESTIONS
 * @api /questions/api/todays-questions
 * @access Private
 * @type GET
 */
router.get("/todays-questions", async (req, res) => {
  await todaysQuestions(req, res);
});

export default router;
