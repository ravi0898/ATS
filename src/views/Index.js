

import Header from "components/Headers/Header.js";
import {Redirect} from "react-router-dom";
import {useApi} from './examples/contextapi';

const Index = (props) => {
  const {auth} = useApi()

  return (
    <>
      {
        auth ? <Header /> : <Redirect to="/auth/login"/>
      } 
    </>
  );
};

export default Index;
