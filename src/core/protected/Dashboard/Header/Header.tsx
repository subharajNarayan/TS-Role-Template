import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TokenService from '../../../../services/jwt-token/jwt-token';
import useAuthentication from '../../../../services/authentication/AuthService';
import { logoutAction } from '../../../../store/root-reducer';
import hamburger from '../../../../assets/images/hamburger-white.png';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

interface Props {
  sidebarToggle: boolean;
  setsidebarToggle: (state: boolean) => void;
  toggleIconsVisibility: () => void;
}

const AppHeader = (props: Props) => {
  const { sidebarToggle, setsidebarToggle } = props;
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();

  const LogOutAction = () => {
    dispatch(logoutAction())
    toast.success('LogOut Successful !!!')
  }

  const userDetails = TokenService.getAccessToken();

  const togglesidebar = () => setsidebarToggle(!sidebarToggle);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="d-flex justify-content-between align-items-center">

          <IconButton onClick={() => {
            togglesidebar();
            props.toggleIconsVisibility();
          }}
            edge="start" color="inherit" aria-label="menu">
            <img src={hamburger} alt="hamburger" width="17" />
          </IconButton>
          <div className='list list__inline list-separator px-4'>
            <div className='header-username'>
              {isAuthenticated() && (
                <Dropdown isOpen={dropdownOpen} toggle={toggle} tag="div">
                  <DropdownToggle className="auth d-flex align-items-center" tag="div" role="button">
                    <div className="textbox mr-2">
                      <h6 className="username font-bold">{userDetails.username}</h6>
                    </div>
                    <i className="ic-dropdown"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={LogOutAction} className="dropdown-item text-danger">
                      <i className="ic-logout"></i>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AppHeader;
