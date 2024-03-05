import { signIn, useSession } from 'next-auth/react';
import { getCurrentUser } from '@/actions/getCurrentUser';

const ForgetPassword = async () => {
  const currentUser = await getCurrentUser();
  console.log('currentUser', currentUser);
  // const { data: session, status: sessionStatus } = useSession();

  // console.log('sessionStatus', sessionStatus);
  // useEffect(() => {
  //   router.push('/login');
  // }, []);

  return <div>ForgetPassword</div>;
};

export default ForgetPassword;
