import { Request, Response } from "express";
import createPaymentMercadoPago from "../services/payments";
import { updateOrderStatus } from "../repositories/orders";

const getMercadoPagoLink = async (req: Request, res: Response) => {
  const { products, orderId, newStatus } = req.body;
  try {
    const checkout = await createPaymentMercadoPago(products);
    const response = await updateOrderStatus(orderId, newStatus);

    return res
      .status(200)
      .json({
        message: "Payment successfull!",
        info: checkout,
        status: response.message,
      });
  } catch (e: any) {
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

export { getMercadoPagoLink };
