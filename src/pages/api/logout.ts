// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Misalnya, lakukan operasi logout di sini
      // Contoh: Hapus token JWT dari penyimpanan lokal, database sesi, atau tempat penyimpanan sesi lainnya.

      // Respons berhasil logout
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Metode selain POST tidak diizinkan
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
