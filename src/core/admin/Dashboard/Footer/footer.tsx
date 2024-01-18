import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const AppFooter = () => {
  return (
    <footer>
      <Nav className='w-100 justify-content-center align-items-baseline'>
        <NavItem className="d-flex align-items-baseline">
          <span className="me-1"> &copy; Copyright-2023</span>
          <NavLink href='#' target='_blank' rel="noopener noreferrer">
            SmartTech Solution Pvt.Ltd.
          </NavLink>
        </NavItem>
        <span className="mx-2">All Right Reserved </span>
      </Nav>
    </footer>
  )
}

export default React.memo(AppFooter)
