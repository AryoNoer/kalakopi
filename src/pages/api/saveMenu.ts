// pages/api/menu.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        menuName,
        menuImage,
        menuPrice,
        menuDescription,
        menuCategory,
      } = req.body;

      // Lakukan validasi input di sini jika diperlukan

      const newMenu = await prisma.menu.create({
        data: {
          name: menuName,
          image: menuImage,
          price: menuPrice,
          description: menuDescription,
          category: menuCategory,
        },
      });

      res.status(200).json({ message: "Menu added successfully", newMenu });
    } catch (error) {
      console.error("Error adding menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}