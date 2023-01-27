import { Request, Response } from "express";
import createPaymentMercadoPago from "../services/payments";

const getMercadoPagoLink = async (req: Request, res: Response) => {
  const { products, buyerInfo } = req.body;
  try {
    const checkout = await createPaymentMercadoPago(products, buyerInfo);

    return res.status(200).json({ url: checkout.init_point });
  } catch (e: any) {
    return res.status(500).json({
      error: true,
      message: "Hubo un error procesando el pago",
    });
  }
};

const webhook = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(body, "webhook response");
      res.end("ok");
    });
  }
  return res.status(200);
};

export { getMercadoPagoLink, webhook };
