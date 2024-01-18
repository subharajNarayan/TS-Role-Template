import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../store/root-reducer';
import useAuthentication from '../../../../services/authentication/AuthService';

const ProtectedHome = () => {

  const { getAuthUser } = useAuthentication();
  const user = getAuthUser();

  const dispatch = useDispatch()

  const LogOutAction = () => {
    dispatch(logoutAction())
  }

  React.useEffect(() => {
    if (user.role && user.role.toLowerCase() !== 'user') {
      LogOutAction();
      window.location.reload();
    }
  }, [])

  return (
    <div>Protected Home</div>
  )
}

export default ProtectedHome;