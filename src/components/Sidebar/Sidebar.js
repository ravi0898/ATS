
import { useState } from "react";
import { NavLink as NavLinkRRD} from "react-router-dom";


import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

import {useApi} from '../../views/examples/contextapi' 
import {useHistory} from 'react-router-dom'


const Sidebar = (props) => {

  const {logout,auth,idchange,updatingobj,settingauth,vanishlogin,
    handlerating} = useApi()


  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  // const activeRoute = (routeName) => {
  //   return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // };
  // toggles collapse between opened and closed (true/false)
  // const toggleCollapse = () => {
  //   setCollapseOpen((data) => !data);
  // };
  // closes the collapse

  const history = useHistory()
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if(auth){
        if(prop.name === 'Login' || prop.name === 'Register'){
          return
        }
      }
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={()=>{
              closeCollapse()
              handlerating(0)
              idchange('')
              updatingobj('')
            }}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const {routes } = props;



  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>

        <Collapse navbar isOpen={collapseOpen}>

          <Nav navbar>{createLinks(routes)}</Nav>
          <Nav navbar>
          <NavItem>
          <NavLink
            to=""
            tag={NavLinkRRD}
            onClick={async()=>{
              vanishlogin()
               logout()
              await settingauth('')
              closeCollapse()
              history.push("auth/login")
            }
              }
            activeClassName="active"
          >
            <i className="fa fa-unlock-alt text-red" />
            Logout
          </NavLink>
        </NavItem></Nav>
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
