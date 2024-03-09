import prisma from '@/libs/prismadb';
import User from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// ============================================================================
// ==========<<< Verify Token POST Route >>>===================================
// ============================================================================
export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await prisma.user.findFirst({
    where: {
      resetToken: {
        equals: resetTokenHash,
      },
      resetTokenExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid or expired reset token' },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: user }, { status: 200 });
}

// ============================================================================
// ==========<<< Reset Password PUT Route >>>==================================
// ============================================================================
export async function PUT(request: Request) {
  const { email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Password reset failed. User not found.' },
        { status: 400 }
      );
    }

    user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        hashedPassword: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Password reset failed. An error occurred.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Password reset successfully.' },
    { status: 200 }
  );
}
