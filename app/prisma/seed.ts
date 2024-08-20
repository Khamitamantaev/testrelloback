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
  await prisma.user.upsert({
    where: { name: "Khamit", email: "test@gmail.com" },
    update: {},
    create: {
      name: 'Khamit',
      email: 'test@gmail.com',
      columns: {
        create: {
          title: "FirstColumn",
          cards: {
            create: {
              title: "FirstCard",
              comments: {
                create: [
                  {
                    text: "Привет! Хороший FirstCard Комментарии1!"
                  },
                  {
                    text: "Привет! Хороший FirstCard Комментарии2!"
                  },
                  {
                    text: "Привет! Хороший FirstCard Комментарии3!"
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

  await prisma.user.upsert({
    where: { name: "Khamit2", email: "test1@gmail.com" },
    update: {},
    create: {
      name: 'Khamit1',
      email: 'test1@gmail.com',
      columns: {
        create: {
          title: "FirstColumn1",
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