import React, { ReactElement, Suspense } from 'react';
import { connect, ConnectedProps, useDispatch } from "react-redux";
import PrivateRoute from '../../../routes/PrivateRoute/PrivateRoute';
import useAuthentication from '../../../services/authentication/AuthService';
import { RootState } from '../../../store/root-reducer';

import AppHeader from './Header/Header'
import Sidebar from './Sidebar/sidebar'
import AppFooter from './Footer/footer'
import "../../../assets/dashboard/scss/style.scss"
import FallbackLoader from '../../../components/React/FallBackLoader/FallBackLoader';
import { useNavigate } from 'react-router-dom';
import appRoutes from "../../../routes/routes";
import { IconButton } from '@mui/material';
import hamburger from '../../../assets/images/hamburger.png';

interface Props extends PropsFromRedux {
  children: any;
}

function Dashboard(props: Props): ReactElement {
  const [sidebarToggle, setsidebarToggle] = React.useState(false);
  const { children } = props;
  const navigate = useNavigate;
  const { isAuthenticated } = useAuthentication();

  const [showIcons, setShowIcons] = React.useState(true);

  const toggleIconsVisibility = () => {
    setShowIcons(!showIcons);
  };

  // const toggleSidebar = () => {
  //   setsidebarToggle(!sidebarToggle);
  // };

  // return (
  //   <Suspense fallback={<FallbackLoader />}>
  //     <div
  //       className={`app theme-dark-blue ${sidebarToggle ? "toggled" : ""}`}
  //       style={{ position: "relative" }}
  //     >
  //       <Sidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} />
  //       <main className="stickyHeader">
  //         <AppHeader sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} />
  //         <div className="body flex-grow-1 px-3">

  //           <PrivateRoute
  //             appRoutes={appRoutes.filter((route) => route.type !== "login")}
  //           />
  //         </div>
  //         <AppFooter />
  //       </main>
  //     </div>
  //   </Suspense>
  // )

  return (
    <Suspense fallback={<FallbackLoader />}>
      <div className={`app theme-dark-blue ${sidebarToggle ? "toggled" : ""}`} style={{ position: "relative" }}>
        <Sidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} showIcons={showIcons}/>
        <main className="stickyHeader">
          <AppHeader sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} toggleIconsVisibility={toggleIconsVisibility}/>
          <div className="body flex-grow-1 p-3">
            {/* <IconButton onClick={toggleSidebar} edge="start" color="inherit" aria-label="menu">
              <img src={hamburger} alt="hamburger" width="17" />
            </IconButton> */}
            <PrivateRoute appRoutes={appRoutes.filter((route) => route.type !== "login")} />
          </div>
          <AppFooter />
        </main>
      </div>
    </Suspense>
  );
}
const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
