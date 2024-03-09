import ResetPasswordEmailTemplate from '@/app/forgot-password/ResetEmailTemplate';
import prisma from '@/libs/prismadb';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

// ============================================================================
// ==========<<< Reset Password POST Route >>>=================================
// ============================================================================
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: 'This Email is not registered.' },
        { status: 404 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedResetToken,
        resetTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const message = ResetPasswordEmailTemplate(resetUrl);
    const text = `Hello, you requested a password reset, click the link below to reset your password. ${resetUrl}`;

    try {
      const msg = {
        to: email,
        from: 'Kesä Perhonen <bikko.webdev@gmail.com>',
        subject: 'Kesä Perhonen - Password Reset',
        text,
        html: message,
      };

      await sgMail.send(msg);
      return NextResponse.json(
        { message: 'Email for password reset successfully sent!' },
        { status: 200 }
      );
    } catch (error: any) {
      await prisma.user.update({
        where: { email },
        data: {
          resetToken: null,
          resetTokenExpires: null,
        },
      });
      return NextResponse.json(
        { message: 'Failed sending password reset email.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// ============================================================================

// const sent = await sgMail.send(msg);
// console.log(sent);
// if (sent) {
//   return NextResponse.json(
//     { message: 'Email for password reset successfully sent!' },
//     { status: 200 }
//   );
// } else {
//   await prisma.user.update({
//     where: {
//       email: email,
//     },
//     data: {
//       resetToken: null,
//       resetTokenExpires: null,
//     },
//   });
//   return NextResponse.json(
//     { message: 'Failed sending password reset email.' },
//     { status: 500 }
//   );
// }

// return NextResponse.json(
//   {
//     message: 'Email successfully sent.\nPlease check your inbox.',
//     html: message,
//     resetToken: hashedResetToken,
//     resetUrl: resetUrl,
//   },
//   { status: 200 }
// );
