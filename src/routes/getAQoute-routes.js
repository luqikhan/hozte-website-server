import { Router } from "express";
import {
  createOrder,
  getOrders,
  todaysOdrders,
  totalOrders,
} from "../apis/getAQuote.apis.js";

const router = Router();

/**
 * @description To CREATE A NEW ORDER
 * @api /orders/api
 * @access Public
 * @type POST
 */
router.post("/", async (req, res) => {
  await createOrder(req, res);
});

/**
 * @description TO GET ALL ORDER
 * @api /orders/api/
 * @access Private
 * @type GET
 */
router.get("/", async (req, res) => {
  await getOrders(req, res);
});

/**
 * @description TO GET TOTAL ORDERS
 * @api /orders/api/total-orders
 * @access Private
 * @type GET
 */
router.get("/total-quotes", async (req, res) => {
  await totalOrders(req, res);
});

/**
 * @description TO GET TODAYS ORDERS
 * @api /orders/api/todays-orders
 * @access Private
 * @type GET
 */
router.get("/todays-quotes", async (req, res) => {
  await todaysOdrders(req, res);
});

export default router;
