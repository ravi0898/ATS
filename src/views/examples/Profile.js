import React,{useState} from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  UncontrolledAlert,
  Row,
  Col
} from "reactstrap";
import ReactTagInput from "@pathofdev/react-tag-input";
import StarRatings from 'react-star-ratings';
import "@pathofdev/react-tag-input/build/index.css";
import FileBase64 from 'react-file-base64';
import { useHistory} from "react-router-dom";



import {useApi} from './contextapi';


// core components

const Profile = () => {
  const {obj,handlechange,handlesubmit,fileis,shownav,validval,message,therating,
    response,responseis,handleskilltag,id,objskill,updatingobj,handlerating,success,successis,idchange,logout,auth,excut,exeis} = useApi();

    const history = useHistory()

    const [filessize,setFilessize] = useState(false)
    const [tags, setTags] = useState([])
    const [, updateState] = React.useState();
    const [rating,setRating] = useState(0)

    const tagsare = ['php','python','java','react','node','javascript','js']

  React.useEffect(()=>{
  
    if(response){
      responseis(false)
    }
    if(success){
      successis(false)
    }
    if(localStorage.getItem("access") && !id){
      idchange('')
    }
  },[])



  React.useEffect(()=>{
    if(objskill === ''){
      return setTags([])
    }
      setTags(objskill.split(','))
  },[updatingobj])

  React.useEffect(()=>{
    if(excut){
      handleskilltag(tags)
    }  
  },[tags])

  React.useEffect(()=>{
    setRating(parseInt(therating))
  },[therating])

  React.useEffect(()=>{
    shownav(false)
  },[shownav]) 

  React.useEffect(()=>{
    auth || history.push("/auth/login")
  },[logout])


  React.useEffect(()=>{
    // setFilessize(false)
    updateState()
  },[idchange,obj])

  React.useEffect(()=>{
    if(!obj.fullname){
      setTags([])
    }
  },[handlesubmit])

  return (
    <>
      <Container className="pt-8 bg-gradient-info pb-3" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          'http://anand.dbtechserver.online/ats/static/media/userimage.6379973e.jpg'
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 mt-9 pt-md-4">

                <div className="text-center">
                  <h3>
                    {localStorage.getItem("fullname") && localStorage.getItem("fullname")}
              
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {localStorage.getItem("email")}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-2">My account</h3>
                  </Col>
                </Row>
                {response &&
                  <UncontrolledAlert color="danger">
                      Candidate already exists!
                </UncontrolledAlert>
                }
                {success &&

                  <UncontrolledAlert color="success">
                      Candidate Registered Successfully..
                  </UncontrolledAlert>
                }
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full Name
                          </label>
                          <Input
                            className={validval.fullname? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="fullname"
                            placeholder="full Name"
                            type="text"
                            value={obj.fullname}
                            onChange={handlechange}
                          />
                          {validval.fullname && <p className="font-weight-light text-sm-left text-danger"><small>{message.fullname !== ''?message.fullname:"Full Name is required"}</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className={validval.emails? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="emails"
                            placeholder="User@example.com"
                            type="email"
                            value={obj.emails}
                            onChange={handlechange}
                          />
                          {validval.emails && <p className="font-weight-light text-sm-left text-danger"><small>"Email is required"</small></p>}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Mobile*
                          </label>
                          <Input
                            className={validval.phone? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="phone"
                            placeholder=""
                            type="text"
                            value={obj.phone}
                            onChange={handlechange}
                          />
                          {validval.phone && <p className="font-weight-light text-sm-left text-danger"><small>"Phone number is required"</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Experience*
                          </label>
                          <Input
                            className={validval.experience? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="experience"
                            placeholder="0"
                            type="number"
                            min="0"
                            step="1"
                            value={obj.experience}
                            onChange={handlechange}
                          />
                          {validval.experience && <p className="font-weight-light text-sm-left text-danger"><small>Experience is required"</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Current CTC*
                          </label>
                          <Input
                            className={validval.currentctc? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="currentctc"
                            placeholder="0"
                            type="number"
                            min="0"
                            step="1"
                            value={obj.currentctc}
                            onChange={handlechange}
                          />
                          {validval.currentctc && <p className="font-weight-light text-sm-left text-danger"><small>Current CTC is required</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Expected CTC*
                          </label>
                          <Input
                            className={validval.expectedctc? "border border-danger form-control-alternative":"form-control-alternative"}
                            id="expectedctc"
                            placeholder=""
                            type="number"
                            min="0"
                            value={obj.expectedctc}
                            onChange={handlechange}
                          />
                          {validval.expectedctc && <p className="font-weight-light text-sm-left text-danger"><small>Expected CTC is required</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Status 
                          </label>
                          <Input className={validval.status? "border border-danger form-control-alternative":"form-control-alternative"} onChange={handlechange} type="select" name="select" value={obj.status} id="status">
                          <option>Interviewed</option>
                          <option>New Jobs</option>
                          <option>Onboard</option>
                          <option>Scanning</option>
                        </Input>
 
                          {validval.status && <p className="font-weight-light text-sm-left text-danger"><small>Status is required</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Ratings
                          </label>
                          <div>
                          <StarRatings
                            // className={validval.rating? "border border-danger form-control-alternative":"form-control-alternative"}
                            rating={rating}
                            id="rating"
                            starDimension="30px"
                            starRatedColor="black"
                            starHoverColor="black"
                            changeRating={(r)=>{
                              handlerating(r)
                              return setRating(r)
                            }}
                            numberOfStars={5}
                            name='rating'
                          />
                          </div>
                          {validval.rating && <p className="font-weight-light text-sm-left text-danger"><small>Consider rating also</small></p>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Medium
                          </label>
                          <Input className={validval.medium? "border border-danger form-control-alternative":"form-control-alternative"} onChange={handlechange} type="select" name="select" value={obj.medium} id="medium">
                          <option>LinkedIn</option>
                          <option>Indeed</option>
                          <option>Naukri.com</option>
                        </Input>

                          {validval.medium && <p className="font-weight-light text-sm-left text-danger"><small>Fill Medium</small></p>}
                        </FormGroup>
                        </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Upload Resume*
                          </label>
                          <FileBase64
        
                            type="file"
                            // inputProps={{ accept: '.xls,.pdf' }}
                            accept="application/pdf,application/vnd.ms-excel"
                            multiple={ false }
                            onDone={(e)=>{
                            const filesize = e.size.split(" ")[0]
                              if(filesize < 3999){
                                setFilessize(false)
                                return fileis(e)
                              }
                              return setFilessize(true)
                            }} />
                        {filessize && <p className="font-weight-light text-sm-left text-danger"><small>File should be less than 4 Mb</small></p>}
                        </FormGroup>
                        <span className="text-white position-absolute mt--2 badge badge-dark">{obj.filename}</span>
                      </Col>
                    </Row>
                      {/* </Col> */}
                  </div>
                  <div className='pl-lg-4'>
                                          {/* <Col lg="10"> */}
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Skill tags*
                          </label>
                          <ReactTagInput 
                            tags={tags} 
                            id="skilltag"
                            placeholder="Skills"
                            removeOnBackspace={true}
                            onChange={(newTags) => setTags(newTags)}
                            validator={(value) => {
                              exeis(true)
                              for(const i of tagsare){
                                if(i === value){
                                  return true
                                }
                              }
                              return false;
                            }}
                          />
                          {/* <Input
                            id="skilltag"
                            placeholder="Skills"
                            type="text"
                            value={obj.skilltag}
                            onChange={handlechange}
                          />
                          {validval.skilltag && <p className="font-weight-light text-sm-left text-danger"><small>Skill is required</small></p>} */}
                        </FormGroup>
                        </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Extra Note</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Note</label>
                      <Input
                        className={validval.note? "border border-danger form-control-alternative":"form-control-alternative"}
                        id="note"
                        placeholder="Note is Mandatory"
                        rows="4"
                        type="textarea"
                        value={obj.note}
                        onChange={handlechange}
                      />
                      {validval.note && <p className="font-weight-light text-sm-left text-danger"><small>Please tell us more</small></p>}
                    </FormGroup>
                  </div>
                  <div>
                    <Button className="float-right" type="submit" onClick={(e)=>{
                      handlesubmit(e)
                      window.scrollTo(0,0)
                    }}>Submit</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
