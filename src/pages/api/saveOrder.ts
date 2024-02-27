import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { fullName, phone, totalHarga, tableNumber,buktiPembayaranUrl, cart } = req.body;
  
  const isFormValid =
    fullName.trim() !== "" &&
    phone.trim() !== "" &&
    tableNumber.trim() !== "" &&
    buktiPembayaranUrl.trim() !== "";

  if (!isFormValid) {
    return res.status(400).json({ message: "Form data is not valid" });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        customer: fullName,
        phone,
        tableNumber,
        buktiPembayaranUrl,
        totalHarga,
        items: {
          create: cart.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return res.status(200).json({ message: "Order saved successfully", newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
