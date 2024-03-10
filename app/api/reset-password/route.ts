import ResetPasswordEmailTemplate from '@/app/forgot-password/ResetEmailTemplate';
import prisma from '@/libs/prismadb';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

// ============================================================================
// ==========<<< Reset Password POST Route >>>=================================
// ============================================================================
export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'Email could not be sent.' },
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
        resetTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
    const message = ResetPasswordEmailTemplate(resetUrl);
    const text = `Hello, you requested a password reset, click the link below to reset your password. \n\n ${resetUrl} \n\n If you did not request a password reset, please ignore this email. Best regards, www.kesa-perhonen-shop.vercel.app`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM as string,
      subject: 'Kesä Perhonen - Password Reset',
      text: text,
      html: message,
    };

    try {
      await sgMail.send(msg);
      return NextResponse.json(
        {
          message: 'Email successfully sent.\nPlease check your inbox.',
          html: message,
          resetToken: hashedResetToken,
          resetUrl: resetUrl,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
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
        { message: 'Email could not be sent.' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Email could not be sent.' },
      { status: 404 }
    );
  }
}

// try {
// sgMail
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
//         resetToken: undefined,
//         resetTokenExpires: undefined,
//       },
//     });
//     return NextResponse.json(
//       { error: error.message || 'Failed sending password reset email.' },
//       { status: 500 }
//     );
//   });
//   await sgMail.send(msg);
//   return NextResponse.json(
//     {
//       success: true,
//       message: 'Email for password reset successfully sent!',
//     },
//     { status: 200 }
//   );
// } catch (error: any) {
//   console.error(error.message);
//   return NextResponse.json(
//     { error: error.message || 'Failed sending email.' },
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
// } catch (error: any) {
//   console.error(error.message);
//   return NextResponse.json(error.message || 'Internal Server Error', {
//     status: 500,
//   });
// }
