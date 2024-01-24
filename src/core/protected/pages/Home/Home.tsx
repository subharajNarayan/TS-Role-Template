import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../store/root-reducer';
import useAuthentication from '../../../../services/authentication/AuthService';
import { Container, Grid, Paper } from '@mui/material';

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
    <div className='home-content'>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Charts */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              {/* <Chart /> */}
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eos tempora nemo tempore accusantium quasi atque maiores quaerat. Deleniti enim velit nostrum, nobis voluptatum sed. Eveniet fuga veniam dolores asperiores.</p>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              {/* <Deposits /> */}
              Small text
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ProtectedHome;