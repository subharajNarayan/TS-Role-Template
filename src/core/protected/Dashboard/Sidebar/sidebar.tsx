import React, { useState } from 'react';
import { Drawer, List, ListItemText, Divider, Toolbar, ListItemButton, ImageList, ImageListItem } from '@mui/material';
// import { Link } from 'react-router-dom';
import { HomeIcon, Form, ComponentIcon, Home, StudentIcon } from '../../../../assets/images/xd';
import { Link, NavLink } from 'react-router-dom';
import fav from "../../../../assets/images/fav.png";

interface Props {
  sidebarToggle: boolean;
  setsidebarToggle: (state: boolean) => void;
  showIcons: boolean;
}

const Sidebar = (props: Props) => {
  const { sidebarToggle } = props;

  const SidebarItem = [
    {
      name: "Home",
      title: "Home",
      link: "/auth/home",
      icon: Home,
    },
    {
      name: "Components",
      title: "Components",
      link: "",
      icon: ComponentIcon,
      children: [
        {
          name: "Form",
          title: 'Form',
          link: "/admin/form",
          icon: Form,
        },
        {
          name: "Student",
          title: 'Student',
          link: '/auth/student',
          icon: StudentIcon,
        },
      ]
    },
  ]

  const [openSubmenu, setOpenSubmenu] = useState(false);

  const checkParentActive = (item: any) => {
    var active = false;

    if (item.children) {
      item.children.forEach((child: any) => {
        if (window.location.href.indexOf(child.link) > -1) {
          active = true;
        }
      });
    }

    return active;
  };


  return (
    <aside className={`sidebar ${sidebarToggle ? 'toggled' : ''}`}>
      <Drawer variant="permanent" open={sidebarToggle} className="sidebar-header-top">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: [1],
          }}
        >
          <div className="sidebar-logo">
            {props.showIcons ? (
              <h6 className='sidebar-text text-center text-uppercase font-bold'>Quick Book</h6>
            ) : (
              <ImageList sx={{ marginBottom: '0px' }}>
                <img src={fav} alt="Quick Book" width={45} />
              </ImageList>
            )}
          </div>
        </Toolbar>
        <Divider />
        <List component="nav" className="list list-sidebar">
          {SidebarItem.map((item) => {
            if (item.children) {
              return (
                <div key={item.name}>
                  <ListItemButton
                    onClick={() => {
                      if (item.children) {
                        setOpenSubmenu(!openSubmenu);
                      }
                    }}
                    className={checkParentActive(item) ? "active" : ""}
                    component={item.children ? 'div' : NavLink}
                    to={item.link}
                  >
                    {props.showIcons ? (
                      <div className='d-flex align-items-center'>
                        <ImageList className='icons' sx={{ marginBottom: '0rem' }}>
                          <ImageListItem key={item.icon}>
                            <img
                              src={item.icon}
                              alt={item.title}
                              loading="lazy"
                              className="menu_icon"
                            />
                          </ImageListItem>
                        </ImageList>
                        <ListItemText primary={item.title} />
                      </div>
                    ) : (
                      <div className='d-flex align-items-center'>
                        <ImageList className='icons' sx={{ marginBottom: '0rem' }}>
                          <ImageListItem key={item.icon} title={item.title}>
                            <img
                              src={item.icon}
                              alt={item.title}
                              loading="lazy"
                              className="menu_icon"
                            />
                          </ImageListItem>
                        </ImageList>
                      </div>
                    )}
                  </ListItemButton>
                  {item.children && openSubmenu && (
                    <List component="div" className="sidebar-submenu">
                      {item.children.map((childItem: any) => (
                        <ListItemButton
                          key={childItem.name}
                          className={window.location.href.indexOf(childItem.link) > -1 ? "active" : ""}
                          component={Link}
                          to={childItem.link}
                        >
                          <div className='d-flex align-items-center'>
                            {props.showIcons ? (
                              <>
                                <ImageList className='icons' sx={{ marginBottom: '0rem' }}>
                                  <ImageListItem key={childItem.icon}>
                                    <img
                                      src={childItem.icon}
                                      alt={childItem.title}
                                      loading="lazy"
                                      className="menu_icon"
                                    />
                                  </ImageListItem>
                                </ImageList>
                                <ListItemText primary={childItem.title} />
                              </>
                            ) : (
                              <ImageList sx={{ marginLeft: '-10px', marginBottom: '0rem'}}>
                                <ImageListItem key={childItem.icon} title={childItem.title}>
                                  <img
                                    src={childItem.icon}
                                    alt={childItem.title}
                                    loading="lazy"
                                    className="menu_icon"
                                    style={{ marginTop: '0rem' }}
                                  />
                                </ImageListItem>
                              </ImageList>
                            )}
                          </div>
                        </ListItemButton>
                      ))}
                    </List>
                  )}
                </div>
              )
            } else {
              return (
                <ListItemButton
                  className={checkParentActive(item) ? "active" : ""}
                  component={item.children ? 'div' : NavLink}
                  to={item.link}
                >
                  {props.showIcons ? (
                    <div className='d-flex align-items-center'>
                      <ImageList sx={{marginBottom: '0rem'}}>
                        <ImageListItem key={item.icon}>
                          <img
                            src={item.icon}
                            alt={item.title}
                            loading="lazy"
                            className="menu_icon"
                          />
                        </ImageListItem>
                      </ImageList>
                      <ListItemText primary={item.title} />
                    </div>
                  ) : (
                    <div className='d-flex align-items-center'>
                      <ImageList sx={{ marginBottom: '0rem'}}>
                        <ImageListItem key={item.icon} title={item.title}>
                          <img
                            src={item.icon}
                            alt={item.title}
                            loading="lazy"
                            className="menu_icon"
                            style={{ marginTop: '0rem' }}
                          />
                        </ImageListItem>
                      </ImageList>
                    </div>
                  )}
                </ListItemButton>
              )
            }
          })}
        </List>

      </Drawer>
    </aside>
  );
};

export default Sidebar;
