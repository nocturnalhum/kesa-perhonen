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
    const body = await request.json();
    const { email } = body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'This Email is not registered' },
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
    const text = `Hello, you requested a password reset, click the link below to reset your password. \n\n ${resetUrl} \n\n If you did not request a password reset, please ignore this email. Best regards, www.kesa-perhonen-shop.vercel.app`;

    try {
      const msg = {
        to: email,
        from: 'Kesä Perhonen <bikko.webdev@gmail.com>',
        subject: 'Kesä Perhonen - Password Reset',
        text: text,
        html: message,
      };

      const sent = await sgMail.send(msg);
      console.log(sent);
      if (sent) {
        return NextResponse.json(
          { message: 'Email for password reset successfully sent!' },
          { status: 200 }
        );
      } else {
        await prisma.user.update({
          where: {
            email: email,
          },
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
      // await sgMail
      //   .send(msg)
      //   .then(() => {
      //     return NextResponse.json(
      //       { message: 'Email for password reset successfully sent!' },
      //       { status: 200 }
      //     );
      //   })
      //   .catch(async (error) => {
      //     console.error(error);
      //     await prisma.user.update({
      //       where: {
      //         email: email,
      //       },
      //       data: {
      //         resetToken: null,
      //         resetTokenExpires: null,
      //       },
      //     });
      //     return NextResponse.json(
      //       { error: error.message || 'Failed sending password reset email.' },
      //       { status: 500 }
      //     );
      //   });
    } catch (error: any) {
      console.error(error.message);
      return NextResponse.json(
        { error: error.message || 'Failed sending email.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Email successfully sent.\nPlease check your inbox.',
        html: message,
        resetToken: hashedResetToken,
        resetUrl: resetUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(error.message || 'Internal Server Error', {
      status: 500,
    });
  }
}
