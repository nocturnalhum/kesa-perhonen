export const dynamic = 'force-dynamic';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user
      .findUnique({
        where: { email: session?.user?.email },
        include: { orders: true },
      })
      .catch((error) => {
        console.error('Error querying user data: ', error.message);
        return null;
      });

    if (!currentUser) {
      console.error('User not found in the database.');
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error('Error in getCurrentUser: ', error);
    return null;
  }
}
