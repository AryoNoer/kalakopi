// pages/api/getOrders.ts

import  {PrismaClient}  from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
}
