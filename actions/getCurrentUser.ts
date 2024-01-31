import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';

export async function getCurrentUser() {
  try {
    let session = null;

    if (process.env.NODE_ENV === 'production') {
      // Only execute dynamic code in production, not during static generation
      session = await getServerSession(authOptions);
      if (!session?.user?.email) return null;
    }

    const currentUser = await prisma?.user.findFirst({
      where: { email: session?.user?.email },
    });

    if (!currentUser) return null;

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
