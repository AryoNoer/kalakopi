import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = await prisma.user.create({
      data: { username, password, role: "user" },
    });

    return res.status(201).json({ message: 'Registration successful', user: newUser });
  }

  return res.status(405).end();
}
