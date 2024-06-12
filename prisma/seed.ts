import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  email: process.env.AUTH_EMAIL as string,
  name: process.env.AUTH_NAME as string,
  password: process.env.AUTH_PASSWORD as string,
  pathPassword: process.env.AUTH_PATH_PASSWORD as string,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const main = async () => {
  await prisma.user.create({ data: userData });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
