import express from "express";
import {
  allOrders,
  newOrder,
  updateOrder,
  getOrderDetail,
} from "../controllers/orders.controller";

const router = express.Router();

router.post("/new-order", newOrder);

router.get("/all", allOrders);

router.post("/update-order", updateOrder);

router.get("/:order_id", getOrderDetail);

export default router;
