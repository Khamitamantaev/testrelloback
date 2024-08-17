import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "password",
    10,
  );
  // create user
  const user1 = await prisma.user.upsert({
    where: { name: "Khamit1", email: "test1@gmail.com" },
    update: { },
    create: {
      name: 'Khamit1',
      email: 'test1@gmail.com',
      columns: {
        create: {
          title: "FirstColimn1",
          cards: {
            create: {
              title: "FirstCard1",
              comments: {
                create: [
                  {
                    text: "Привет! Хороший FirstCard1 Комментарии1!"
                  },
                  {
                    text: "Привет! Хороший FirstCard1 Комментарии2!"
                  },
                  {
                    text: "Привет! Хороший FirstCard1 Комментарии3!"
                  }
                ]
              }
            }
          }
        }
      },
      password: hashedPassword
    },
  });

  console.log({ user1 });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })