// pages/api/login.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Pemeriksaan username dan password (Anda dapat menggunakan bcrypt untuk keamanan yang lebih baik)
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET||"secret", {
        expiresIn: "1h", // Token expiration time
      });
      res.status(200).json({ token });
      return res.status(401).json({ error: 'Invalid credentials' });
      
    }
    // Jika sukses, kembalikan data role dari database
    return res.status(200).json({ role: user.role },);
  }

  // Metode selain POST tidak didukung
  return res.status(405).end();
}
