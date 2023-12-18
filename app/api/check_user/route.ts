import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(req: { query: { email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { isLoggedIn: boolean; }): void; new(): any; }; }; }) {
  const { email } = req.query;
    console.log(email);
  // Your code to check if the user is logged in or not
  const user = await prisma.user.findUnique({ where: { email } });
  const isLoggedIn = user ? true : false;

  res.status(200).json({ isLoggedIn });
}