import React from 'react';
import { HomeIcon, Dashboard, Form, List, AboutIcon, Pagination, Checkbox, Carousel } from '../../../../assets/images/xd';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledCollapse } from 'reactstrap';
import topLogo from '../../../../assets/images/fav.png';

interface Props {
  sidebarToggle: boolean;
  setsidebarToggle: (state: boolean) => void;
}

const AppSidebar = (props: Props) => {
  // const dispatch = useDispatch()

  const { sidebarToggle, setsidebarToggle } = props;
  const togglesidebar = () => setsidebarToggle(!sidebarToggle);

  const SidebarItem = [
    {
      name: "Home",
      title: "Home",
      link: "/admin/home",
      icon: HomeIcon,
    },
    {
      name: "Components",
      title: "Components",
      link: "",
      icon: Dashboard,
      children: [
        // {
        //   name: "Form",
        //   title: 'Form',
        //   link: "/admin/form",
        //   icon: Form,
        // },
        
      ]
    },
  ]

  const checkParentActive = (item:any) => {
    var active = false;

    item.children.forEach((child:any) => {
      if (window.location.href.indexOf(child.link) > -1) {
        active = true;
      }
    });
    return active;
  };


  return (

    <aside className="sidebar">
      <div className="py-3 mt-2">
        <div className='sidebar-header-top align-vertical px-3'>
          <div>
            <h6 className='sidebar-text text-center text-uppercase font-bold'>Quick Book</h6>
            {/* <img src={topLogo} alt="" width="27" /> */}
          </div>
          <div role='button' className="toggler-close" onClick={togglesidebar}>
            <i className='ic-close'></i>
          </div>
        </div>
      </div>
      <ul className="list list-sidebar">
        {SidebarItem.map((item) => {
          if (item.children) {
            return (
              <React.Fragment key={item.name}>
                <li>
                  <Link
                    id={item.name}
                    to="#"
                    className={checkParentActive(item) ? "active" : ""}
                  >
                    <img src={item.icon} alt="" className="menu_icon" />
                    {item.title}
                  </Link>
                </li>
                <li key={item.name}>
                  <UncontrolledCollapse
                    toggler={`#${item.name}`}
                    className="ml-3 mr-1 menu__collapsable-sub collapse"
                  >
                    {/* {item.children.map((subitem) => (
                      <Link
                        to={subitem.link}
                        className={`${window.location.href?.includes(subitem.link) ? "active" : ""
                          }`}
                      >
                        <img src={subitem.icon} alt="" className="menu_icon" /> {subitem.title}
                      </Link>
                    ))} */}
                  </UncontrolledCollapse>
                </li>
              </React.Fragment>
            );
          } else {
            return (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={`${window.location.href?.includes(item.link) ? "active" : ""}`}
                  // activeClassName={`${window.location.href?.includes(item.link) ? "active" : ""}`}
                >
                  <img src={item.icon} alt="" className="menu_icon" /> {item.title}
                </NavLink>
              </li>
            );
          }
        })}
      </ul>
    </aside>
  )
}

export default AppSidebar;
