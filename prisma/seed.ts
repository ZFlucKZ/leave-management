import { db } from '~/server/db';
import { faker } from '@faker-js/faker';
import { type LeaveStatus, type Prisma } from '@prisma/client';

async function main() {
  // Create Admin
  // upsert = update if exist if not insert
  const admin = await db.user.upsert({
    where: { email: 'admin@coder.com' },
    update: {},
    create: {
      email: 'admin@coder.com',
      name: 'Admin',
      password: 'password',
      role: 'ADMIN',
      image: faker.internet.avatar(),
    },
  });

  // Create Users
  const numOfUsers = 10;
  const userIds: number[] = [admin.id];

  for (let i = 0; i < numOfUsers; i++) {
    const createUserInput: Prisma.UserCreateInput = {
      name: faker.internet.displayName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'MEMBER']),
    };

    const user = await db.user.upsert({
      where: { email: createUserInput.email },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.id);
  }

  // Create Leaves
  const numOfLeaves = 100;

  for (let i = 0; i < numOfLeaves; i++) {
    const status: LeaveStatus = faker.helpers.arrayElement([
      'PENDING',
      'APPROVED',
      'REJECTED',
    ]);
    const userId = faker.helpers.arrayElement(userIds);
    const leaveDate = faker.date.future().toISOString();

    const createLeaveInput: Prisma.LeaveCreateInput = {
      leaveDate,
      reason: faker.lorem.paragraph(),
      user: {
        connect: {
          id: userId,
        },
      },
      status,
      rejectionReason:
        status === 'REJECTED' ? faker.lorem.paragraph() : undefined,
    };

    await db.leave.upsert({
      where: {
        userId_leaveDate: {
          userId,
          leaveDate,
        },
      },
      update: {},
      create: createLeaveInput,
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect();
    process.exit(1);
  });

// Good End - 0
// Bad End - 1
