import express from "express";

import { getMercadoPagoLink } from "../controllers/payments.controller";

const router = express.Router();

router.post("/new", getMercadoPagoLink);

export default router;
