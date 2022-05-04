import React from 'react'
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import {useApi} from './contextapi';
import {Link} from 'react-router-dom';

const Login = () => {
  const {shownav,log_in,logoutwhen,handlelogin,logintrue,login,auth,
    loginmessage} = useApi()
  let history = useHistory();
  

  React.useEffect(()=>{
    shownav(false)
  },[shownav])

  React.useEffect(()=>{
    return auth && history.push("/admin/index");
  },[auth])



  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Log In</small>
              <div className='mt-2'>
              {loginmessage &&
                  <div>
                    {
                      loginmessage === 'Successfully Logout form all devices' ?
                      <Alert
                        color="success"
                      >
                        {loginmessage}
                      </Alert>  
                      :<Alert
                        color="danger"
                      >
                        {loginmessage}
                      </Alert>    
                    }
                </div>
                }
              </div>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className={logintrue.email? "border border-danger input-group-alternativ":"input-group-alternative"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={login.email}
                    onChange={(e)=>handlelogin(e)}
                  />
                </InputGroup>
                {logintrue.email && <p className="font-weight-light text-sm-left text-danger"><small>"Email is required"</small></p>}
              </FormGroup>
              <FormGroup>
                <InputGroup className={logintrue.password? "border border-danger input-group-alternativ":"input-group-alternative"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={login.password}
                    onChange={(e)=>handlelogin(e)}
                  />
                </InputGroup>
                {logintrue.password && <p className="font-weight-light text-sm-left text-danger"><small>Password should be more than 5 character</small></p>}
              </FormGroup>
              {
                loginmessage === 'Error: User is logged in other device' && <Button type="submit" className='btn btn-outline-danger btn-sm float-right' onClick={logoutwhen}>Logout</Button>
              }
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={log_in}>
                  Sign in
                </Button>
              </div>
            </Form>
            <span className="text-sm font-weight-light">
            New User?  
            </span>
            <Link to="/auth/register" className="text-md font-weight-bold">
             {' '}Signup
             </Link>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
