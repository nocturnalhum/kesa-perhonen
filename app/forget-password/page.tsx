'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  // const { data: session, status: sessionStatus } = useSession();

  // console.log('sessionStatus', sessionStatus);
  // useEffect(() => {
  //   router.push('/login');
  // }, []);

  return <div>ForgetPassword</div>;
};

export default ForgetPassword;
