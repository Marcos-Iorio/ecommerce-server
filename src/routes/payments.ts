import express from "express";

import {
  getMercadoPagoLink,
  webhook,
} from "../controllers/payments.controller";

const router = express.Router();

router.post("/new", getMercadoPagoLink);

router.post("/webhook", webhook);

export default router;
