import { useCalendarSum } from 'hooks/useCalendarSum';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userLogin } from 'recoil/userAtom';

function UserAttribute() {
  const getToken = localStorage.getItem('token') ? true : null;
  const [loginState, setLoginState] = useRecoilState(userLogin);
  const { mutate } = useCalendarSum();

  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (getToken === null) {
      setLoginState(true);
      navigate('/');
    } else {
      localStorage.clear();
      mutate(undefined, false);
      setLoginState(false);
      navigate('/login');
    }
  };
  const logoClickHandler = () => {
    navigate('/user/main');
  };
  return { handleLoginClick, logoClickHandler };
}

export default UserAttribute;
