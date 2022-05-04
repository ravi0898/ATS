import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './mode.css';
import StarRatings from 'react-star-ratings';
import { useAlert } from 'react-alert'
import { SpinStretch } from "react-cssfx-loading";
import {
  Card,
  CardHeader,
  CardFooter,
  Col,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  UncontrolledDropdown,
  FormGroup,
  DropdownToggle,
  Form,
  Input,
  Label,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Fade,
  Table,
  Container,
  Row,
  NavbarBrand,
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap";
import { useDetectClickOutside } from 'react-detect-click-outside';


import {useApi} from './contextapi'


const Tables = () => {
  const {shownav,userdata,idchange,auth,dashboard,goalsetting,
    settingupgoal,goalset,updatingobj,handleskilltag} = useApi();
  const [info,setInfo] = useState("")
  const [fadein,setFadein] = useState(false)

  const [next,setNext] = useState(10)
  const [prev,setPrev] = useState(0)
  const [pagprev,setPagprev] = useState(0)
  const [pagnext,setPagnext] = useState(3)
  const [aval,setAval] = useState(0)
  const [toggling,setToggling] = useState(false)
  const [togglinggoal,setTogglinggoal] = useState(false)
  const [statusfil,setStatusfil] = useState({
    interview:false,
    newjobs:false,
    onboard:false,
    scans:false
  })

  const [filterRating,setFilterRating] = useState(0)

  const refs = useDetectClickOutside({ onTriggered: ()=>{
    setToggling(false)
    setTogglinggoal(false)
  } });

  const [tagvalue,setTagvalue] = useState([])
  const [tagging,setTagging] = useState({})

  let history = useHistory();


  useEffect(()=>{
    if(!auth){
      history.push("/auth/login");
    }
    dashboard()
    idchange('')
    setAval(0)
    handleskilltag('')
    return shownav(false)
  },[])


  const alert = useAlert()

  const filterbystate = (data)=>{
      if( statusfil.interview || statusfil.scans || statusfil.newjobs || statusfil.onboard ){

        return (
          statusfil.interview && (data.status === 'Interviewed') ||
          statusfil.scans && (data.status === 'Scanning') ||
          statusfil.onboard && (data.status === 'Onboard') ||
          statusfil.newjobs && (data.status === 'New Jobs') 
          )
      }
        return data
  }



  const filterbyrating = (data)=>{
    if(filterRating){
      return data.rating && (data.rating.toString() === filterRating.toString())
    }
    return data
  }

  const filterbytags = (data) => {
    
    if(Object.keys(tagging).length !== 0){
      if(Object.values(tagging).every(value => value === false)){
        return data
      }
    }

    if(data.skilltags){
        for(const key of Object.keys(tagging)){
          if(tagging[key]){
            if(data.skilltags.includes(key)){
              return true
            }
            return false
            break;
          }
          // if(tagging[key]){
          //   if(!data.skilltags.includes(key)){
          //     return false
          //   }
          //   return true
          // }
        }
        return data
    }

  }

  useEffect(()=>{
    const arr = []
    if(userdata){
      if(userdata.length > 1){
        for(const i of userdata){
          if(i.skilltags){
            const arra = i.skilltags.split(',')
            arr.push(...arra)
          }
        }
        const sets = new Set(arr)
        setTagvalue([...sets])
        tagvalue.map((val)=>{
          return setTagging((preval)=>({
            ...preval,
            [val.replace( / +/g, '')]:false
          }))
        })
       
      }
    }
  },[userdata])


  const tabledata = (e)=>{
      e.preventDefault()  
      let value = parseInt(e.target.innerText)
      setPrev(value*10 - 10)
      setNext(value*10)
      }

      const [modal, setModal] = React.useState(false);
      const [modals, setModals] = React.useState(false);

  
      // Toggle for Modal
      const toggle = () => setModal(!modal);
      const toggles = () => setModals(!modals);


  const checknextpage = () =>{
    if(userdata){
        if(pagnext < 3){
          return
        }
        for(const l in statusfil){
          if(statusfil[l]){
            let val = 0
            if(statusfil.interview){
              for(const k of userdata){
                if(k.status === 'Interviewed'){
                  val += 1
                }
              }
            }
            if(statusfil.scans){
              for(const k of userdata){
                if(k.status === 'Scanning'){
                  val += 1
                }
              }
            }
            if(statusfil.onboard){
              for(const k of userdata){
                if(k.status === 'Onboard'){
                  val += 1
                }
              }
            }
            if(statusfil.newjobs){
              for(const k of userdata){
                if(k.status === 'New Jobs'){
                  val += 1
                }
              }
            }
            
            let newval = val/10
            if(pagnext<newval){
              setPagnext((pr)=>pr+1)
              setAval((v)=>{
              return v + 1
              })
              return setPagprev((p)=>p+1)
            }
          }
        }
        if(pagnext < userdata.length/10){
            setPagprev((pre)=>{
              return pre + 1
            })
            setPagnext((val)=>{
              return val + 1
            })
            setAval((v)=>{
              return v + 1
            })
          }

        }
      }



    const checkprevarray = () =>{
      if(userdata){
        if(pagprev === 0){
          return 
        }
        if(pagprev < userdata.length){
          setPagprev((pre)=>{
            return pre - 1
          })
          setPagnext((val)=>{
            return val - 1
          })
          setAval((v)=>{
            return v - 1
          })
          }
        }
      }


  useEffect(()=>{
    let count = 0
    if(statusfil.interview){
      for(const i of userdata){
        if(i.status === 'Interviewed'){
          count += 1
        }
      }
    }
    if(statusfil.scans){
      for(const i of userdata){
        if(i.status === 'Scanning'){
          count += 1
        }
      }
    }
    if(statusfil.onboard){
      for(const i of userdata){
        if(i.status === 'Onboard'){
          count += 1
        }
      }
    }
    if(statusfil.newjobs){
      for(const i of userdata){
        if(i.status === 'New Jobs'){
          count += 1
        }
      }
    }
    if(filterRating){
        for(const i of userdata){
          if(i.rating === '1' && filterRating === 1){
            count += 1
          }
          if(i.rating === '2' && filterRating === 2){
            count += 1
          }
          if(i.rating === '3' && filterRating === 3){
            count += 1
          }
          if(i.rating === '4' && filterRating === 4){
            count += 1
          }
          if(filterRating === 5 && i.rating === '5'){
            count += 1
          }
        }
      }

    if(count === 0 && filterRating){
      alert.error('No Match Found')
      setPagprev(0)
      return setPagnext(1)
    }
      if(count){
        if(count <= 10){
          setPagprev(0)
          return setPagnext(1)
        }else if(count <= 20){
          setPagprev(0)
          return setPagnext(2)
        }else if(count > 20){
          setPagprev(0)
          return setPagnext(3)
        }  
    }

    setPagnext(3)
    setPagprev(0)
  },[statusfil,filterRating])

  
  useEffect(()=>{
    if(!statusfil.interview || !statusfil.onboard || !statusfil.newjobs || !statusfil.scans){
        setPrev(0)
        return setNext(10)
    }

      setPrev(0)
      setNext(10)
  },[statusfil,filterRating])

  useEffect(()=>{
    if(filterbytags.length > 0){
      if(filterbytags.length <= 10){
        setPagprev(0)
        return setPagnext(1)
      }
      if(filterbytags.length > 10 && filterbytags.length <= 20){
        setPagprev(0)
        return setPagnext(2)
      }
      if(filterbytags.length > 20){
        const val = Math.ceil(filterbytags.length/10)
        setPagprev(0)
        return setPagnext(val)
      }
    }
  })
    
  const changingtoggle = ()=>{
    settingupgoal()
    setTogglinggoal(false)
  }


    if(!userdata){
      return (
        <div style={{position:"fixed",height:"100%",top:"50%",left:"50%",marginTop:"-5%",marginLeft:"5%"}}>
        {/* <Container fluid> */}
      <div>
      <SpinStretch color="green" duration="3s" />
       <h3 className="ml--6">Loading please wait...</h3>
      </div>
      {/* </Container> */}
      </div>
      )
    }


  return (

      <Container className="pt-6 bg-gradient-info" fluid>
        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader><NavbarBrand className='text-info'>Candidate Information</NavbarBrand></ModalHeader>
                <ModalBody className='mb--4 mt--4'>
                    {
                      userdata && userdata.filter((arr)=>{
                        return arr._id === info
                      }).map((obj)=>{
                        const {fullname,_id,email,phoneNumber,experience,
                          currentCTC,expectedCTC,skilltags,cv,status,rating,mediumFrom,adminNote,filename} = obj
                          let ratings = rating ? rating : 0
                        return (
                        <Fade in={fadein}>
                        <div key={_id} className=''>
                        <Container className='border border-info pt-3 pl-3 pr-3 rounded'>
                        
                          <Row>
                            <Col xs="6"><h4>Name</h4></Col>
                            <Col xs="6"><span>{fullname}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Email</h4></Col>
                            <Col xs="6"><span>{email}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Mobile Number</h4></Col>
                            <Col xs="6"><span>{phoneNumber}</span></Col>
                          </Row>


                          <Row>
                            <Col xs="6"><h4>Experience</h4></Col>
                            <Col xs="6"><span>{experience}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Current CTC</h4></Col>
                            <Col xs="6"><span>{currentCTC}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Expected CTC</h4></Col>
                            <Col xs="6"><span>{expectedCTC}</span></Col>
                          </Row>
              
                          <Row>
                            <Col xs="6"><h4>Skills</h4></Col>
                            <Col xs="6"><span>{skilltags}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Status</h4></Col>
                            <Col xs="6"><span>{status}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Rating</h4></Col>
                            <Col xs="6"><span>{ratings}</span></Col>
                          </Row>  

                          <Row>
                            <Col xs="6"><h4>Medium</h4></Col>
                            <Col xs="6"><span>{mediumFrom}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Note</h4></Col>
                            <Col xs="6"><span>{adminNote}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>File</h4></Col>
                            <Col xs="6"><span> <a download={fullname+' '+filename} href={cv} title='Download'>Download</a></span></Col>
                          </Row>                      
                      </Container>
                    </div>
                    </Fade>
                    )
                      })
                    }
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={()=>{
                      setInfo('')
                      toggle()
                      setFadein(false)
                    }}>Okay</Button>
                </ModalFooter>
            </Modal>

            {/* {second model} */}
            <Modal isOpen={modals} toggle={toggles} >
              
                <ModalHeader><NavbarBrand className='text-info'>Filter</NavbarBrand></ModalHeader>
                <ModalBody className='mb--4 mt--4'>
                <div className='d-flex'>
                <div>
                    <h3 className='text-nowrap'>By Tags</h3>
                <div className='position-absolute overflow-auto  h-75'>
                <Form>
                  {
                    tagvalue.map((datavalue,index)=>{
                      const dataval = datavalue.replace( / +/g, '')
                      return (
                        <span key={index}>
                        <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                          defaultChecked={tagging.dataval}
                          onChange={(valsis)=>setTagging({...tagging,[dataval]:valsis.target.checked})}
                          />{' '}
                          {datavalue}
                        </Label>
                      </FormGroup>
                      </span>
                      )
                    })
                  }
                </Form>
                </div>
                </div> 
                  <div className="ml-9">
                    <h3>By Status</h3>
                <Form>
                    <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      defaultChecked={statusfil.interview}
                      onChange={()=>setStatusfil({...statusfil,interview:!statusfil.interview})}
                      />{' '}
                      Interviewed
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.onboard}
                      onChange={()=>setStatusfil({...statusfil,onboard:!statusfil.onboard})}
                      />{' '}
                      Onboard
                    </Label>
                  </FormGroup>
                 
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.scans}
                      onChange={()=>setStatusfil({...statusfil,scans:!statusfil.scans})}
                      />{' '}
                      Scanning
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.newjobs}
                      onChange={()=>setStatusfil({...statusfil,newjobs:!statusfil.newjobs})}
                      />{' '}
                      New Jobs
                    </Label>
                  </FormGroup>
                </Form>
                </div>
                <div className='ml-5'>
                <h3>By Rating</h3>
                <Form>
                      <StarRatings
                        rating={filterRating}
                        id="rating"
                        starDimension="20px"
                        starRatedColor="blue"
                        starHoverColor="blue"
                        changeRating={(r)=>setFilterRating(r)}
                        numberOfStars={5}
                        />
                  </Form>
                  </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                <Button color="info" onClick={()=>{
                      toggles()
                      setFadein(false)
                    }}>Okay</Button>
                <Button color="info" onClick={()=>{
                      setFilterRating(0)
                    }}>Reset Rating</Button>
                </ModalFooter>
              
            </Modal>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Candidate's Data <span  className="mb-0 float-right">
                <Dropdown isOpen={togglinggoal} toggle={()=>{
                  return
                }} onClick={()=>setTogglinggoal(true)} direction="left" >
                <DropdownToggle className="bg-info text-white" caret>
                  Set Goal
                </DropdownToggle>
            
                <DropdownMenu flip={false}>
                <Form>
                  <DropdownItem >
                    <FormGroup check>
                    <Label for="exampleEmail">
                        Setting Goal
                      </Label>
                      <Input
                        id="goalis"
                        value={goalset.goalis}
                        onChange={goalsetting}
                      />
                  </FormGroup>
                  </DropdownItem>

                  <DropdownItem>
                  <FormGroup check>
                  <Label for="exampleEmail">
                        Hiring
                      </Label>
                      <Input
                        id="hiringis"
                        value={goalset.hiringis}
                        onChange={goalsetting}
                      />
                  </FormGroup>
                  </DropdownItem>
                  <Button className="ml-5 p--5" color="info" onClick={changingtoggle}>Update</Button>
                </Form>
                </DropdownMenu>
               </Dropdown>
               <button className="btn btn-lighte text-dark border bg-info text-white" onClick={()=>{
                    setModals(true)
                    setTagging(tagging)
                      Object.keys(tagging).map(function(key, index) {
                        return setTagging((tags)=>{
                          return {...tags,[key]:false}
                        })
                    });
                  }
                }>Filter</button>
                </span>
                </h3>
              </CardHeader>


              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Experience</th>
                    <th scope="col">View</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    {
                      userdata &&
                      userdata.filter((data)=>{
                          return filterbystate(data)
                      }).filter((data)=>{
                    
                        return filterbyrating(data)
                      }).filter((data)=>{
                        return filterbytags(data) 
                      }).slice(prev,next).map((usersdata,index)=>{
                        const {fullname,_id,phoneNumber,experience,rating} = usersdata
                       let ratings = rating ? rating : 1
                        let idis = _id
                     
                      return (
                      <tr
                      key={_id}
                       >
                        <th scope="row">
                          <Media className="align-items-center">
                                  <a
                                  className="avatar rounded-circle mr-3"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="some"
                                    src="http://anand.dbtechserver.online/ats/static/media/userimage.6379973e.jpg"
                                  />
                                </a>
                                <Media>
                                <span className="mb-0 text-sm text-capitalize">
                                  {fullname}
                                </span>
                              </Media>
                          </Media>
                        </th>
                        <td>{phoneNumber?phoneNumber:"Not Provided"}</td>
                        <td> <span className="fa fa-star text-yellow"></span>
                        { 
                          ratings > 0 && [...Array(ratings-1)].map((e,index)=><span key={index} className="fa fa-star checked text-yellow"></span>)
                        }
                        </td>
                        <td>{experience?experience:"Not Provided"}</td>
                        <td><Button 
                        color="info" 
                        onClick={(e)=> {e.preventDefault();

                          setInfo('')
                          setInfo(_id)
                          setModal(true)
                          setTimeout(()=>{
                          setFadein(true)
                          },500)
                        }}>View</Button></td>
                        <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                idchange(idis)
                                updatingobj(usersdata)
                                history.push('/admin/user-profile')
                              }}
                            >
                              Edit User                           
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                        );
                      })
                    }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) =>{
                          e.preventDefault();
                          checkprevarray()
                        }
                          }
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {
                      [...Array(3+aval)].slice(pagprev,pagnext).map((arr,index)=>{
                        
                        return (
                          <>
                            <PaginationItem className='active' key={index + Math.floor(Math.random()*10)} >
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) =>{ 
                               tabledata(e)
                            }}
                            >
                            {index + 1 + aval}
                          </PaginationLink>
                        </PaginationItem>
                       </>
                       )
                    })                    
                    }
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault()
                          checknextpage()
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        
      </Container>
  );
};

export default Tables;
