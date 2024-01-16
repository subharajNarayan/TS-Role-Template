import React from 'react'
import useAuthentication from '../../../../services/authentication/AuthService';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../store/root-reducer';

const AdminHome = () => {

  const { getAuthUser } = useAuthentication();
  const user = getAuthUser();


  const dispatch = useDispatch();
  const LogOutAction = () => {
    dispatch(logoutAction())
  }


  React.useEffect(() => {
    if (user && user.role && user.role?.toLowerCase() !== 'admin') {
      LogOutAction();
      window.location.reload();
    }
  }, [user?.role]);

  return (
    <div>Admin AdminHome</div>
  )
}

export default AdminHome;