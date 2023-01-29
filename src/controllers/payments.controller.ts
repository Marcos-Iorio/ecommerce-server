import { Request, Response } from "express";
import createPaymentMercadoPago from "../services/payments";

const getMercadoPagoLink = async (req: Request, res: Response) => {
  const { products } = req.body;
  try {
    const checkout = await createPaymentMercadoPago(products);
    return res
      .status(200)
      .json({ message: "Payment successfull!", info: checkout });
  } catch (e: any) {
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

export { getMercadoPagoLink };
