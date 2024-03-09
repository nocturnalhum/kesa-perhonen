import Container from '../components/Container';
import FormWrap from '../components/FormWrap';
import ForgetPasswordForm from './ForgetPasswordForm';
import { getCurrentUser } from '@/actions/getCurrentUser';

const ForgotPassword = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <ForgetPasswordForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default ForgotPassword;
