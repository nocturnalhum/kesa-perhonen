import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';
import ResetPasswordForm from './ResetPasswordForm';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Register = async ({ params }: any) => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <ResetPasswordForm token={params.token} currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
