import express from "express";
import { allOrders, newOrder } from "../controllers/orders.controller";

const router = express.Router();

router.post("/new-order", newOrder);

router.get("/all", allOrders);

export default router;
