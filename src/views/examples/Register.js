import { useEffect } from "react";
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
  Row,
  Col,
} from "reactstrap";
import {useApi} from './contextapi';
import {Link,useHistory} from "react-router-dom";


const Register = () => {
  const {adminsign,handlesignup,signupchange,uservalid,userlogin,message,adminresp,auth} = useApi()

 const history = useHistory()

  useEffect(()=>{
    setTimeout(()=>{
      userlogin && history.push("/auth/login")
    },3000)
  },[userlogin])

  useEffect(()=>{
    if(auth){
      history.push("/auth/login")
    }
  },[])

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className={uservalid.name? "border border-danger input-group-alternative mb-3":"input-group-alternative mb-3"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  id="name" 
                  placeholder="Name" 
                  type="text"
                  value={adminsign.name}
                  onChange={signupchange}
                  />
                </InputGroup>
                {uservalid.name && <p className="font-weight-light text-sm-left text-danger"><small>Please fill name field with more than 5 character</small></p>}

              </FormGroup>
              <FormGroup>
                <InputGroup className={uservalid.email? "border border-danger input-group-alternative mb-3":"input-group-alternative mb-3"}>
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
                    value={adminsign.email}
                    onChange={signupchange}
                  />
                  </InputGroup>
                  {uservalid.email && <p className="font-weight-light text-sm-left text-danger"><small>{message.emessage? message.emessage : "Email is required"}</small></p>}
              </FormGroup>
              <FormGroup>
                <InputGroup className={uservalid.password? "border border-danger input-group-alternative mb-3":"input-group-alternative mb-3"}>
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
                    value={adminsign.password}
                    onChange={signupchange}
                  />
                </InputGroup>
                  {uservalid.password && <p className="font-weight-light text-sm-left text-danger"><small>Password is required and It should be more than 5 char</small></p>}
              </FormGroup>
              <FormGroup>
                <InputGroup className={uservalid.confirm? "border border-danger input-group-alternative mb-3":"input-group-alternative mb-3"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="confirm"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={adminsign.confirm}
                    onChange={signupchange}
                  />
                </InputGroup>
                {uservalid.confirm && <p className="font-weight-light text-sm-left text-danger"><small>{message.confirm !== ''?message.confirm:'Password is required'}</small></p>}
              </FormGroup>
              {adminresp ?
                    <Row className="align-items-center mt-2">
                    <Col xs="8">
                      <h4 className="mb-0 text-danger form-control-label">User already exists!</h4>
                    </Col>
                  </Row>: userlogin && 
                  <Row className="align-items-center mt-2">
                    <Col xs="8">
                      <h4 className="mb-0 text-success form-control-label">Successfully logged In</h4>
                    </Col>
                  </Row>
                }
              <div className="text-center">
                <Button className="mt-5" color="primary" type="submit" onClick={handlesignup}>
                  Create account
                </Button>
              </div>
            </Form>
            <div className="mt--7 mb-5">
            <span className="text-sm font-weight-light">
            Already have an account?  
            </span>
            <Link to="/auth/login" className="text-md font-weight-bold">
             {' '}Log in
             </Link>
             </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
