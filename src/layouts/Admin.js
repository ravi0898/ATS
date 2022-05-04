
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import {useApi} from '.././views/examples/contextapi'; 
import {Error} from '../views/examples/Error.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


import routes from "routes.js";

const Admin = (props) => {

  const {navshow} = useApi()

  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
      />
      <div className="main-content" ref={mainContent}>
        { navshow || <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
          }
        <Switch>
            <AlertProvider template={AlertTemplate} {...options}>
              {getRoutes(routes)}
            </AlertProvider>
          <Route path="*" component={Error}/>
        </Switch>
        <Container fluid>
          {navshow &&
            <AdminFooter />
          }
        </Container>
      </div>
    </>
  );
};

export default Admin;
