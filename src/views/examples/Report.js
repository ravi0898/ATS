import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useApi} from './contextapi';
import { motion } from "framer-motion"
import {Card,CardBody,CardTitle,Col,CardHeader,Container,Row} from 'reactstrap'
import { SpinStretch } from "react-cssfx-loading";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Candidate's Data",
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

  
const Report = () => {
  const {shownav,userdata,goal} = useApi()
  const [userinfo,setUserinfo] = useState(null)


  useEffect(()=>{
    return shownav(false)
  },[shownav])


  
  let months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  
  
  const arrayparseForInter = ()=>{
    const newjobs = []
    for(const k of months){
      if(userinfo){
      for(const val in userinfo.interview){
        if(k === val){
          if(!userinfo.interview[val]){
            newjobs.push(0)
            break;
          }  
          newjobs.push(userinfo.interview[val])
          break;
        }
      }
    }
    }
    return newjobs
  }
  const arrayparseForjobs = ()=>{
    const newjobs = []
    for(const k of months){
      if(userinfo){
      for(const val in userinfo.newjob){
        if(k === val){
          if(!userinfo.newjob[val]){
            newjobs.push(0)
            break;
          }  
          newjobs.push(userinfo.newjob[val])
          break;
        }
      }
    }
    }
    return newjobs
  }
  const arrayparseForscan = ()=>{
    const newjobs = []
    for(const k of months){
      if(userinfo){
      for(const val in userinfo.scanning){
        if(k === val){
          if(!userinfo.scanning[val]){
            newjobs.push(0)
            break;
          }  
          newjobs.push(userinfo.scanning[val])
          break;
        }
      }
    }
    }
    return newjobs
  }
  const arrayparseForboard = ()=>{
    const newjobs = []
    for(const k of months){
      if(userinfo){
      for(const val in userinfo.onboard){
        if(k === val){
          if(!userinfo.onboard[val]){
            newjobs.push(0)
            break;
          }  
          newjobs.push(userinfo.onboard[val])
          break;
        }
      }
    }
    }
    return newjobs
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Interviewed',
        data: arrayparseForInter(),
        backgroundColor: 'coral',
      },
      {
        label: 'New Jobs',
        data: arrayparseForjobs(),
        backgroundColor: 'teal',
      },
      {
        label: 'Onboard',
        data: arrayparseForboard(),
        backgroundColor: 'maroon',
      },
      {
        label: 'Scanning',
        data: arrayparseForscan(),
        backgroundColor: 'orange',
      }
    ],
  }

  useEffect(()=>{
    //for candidates
    let anobj = {
      newjob:{
        January:0,
        February:0,
        March:0,
        April:0,
        May:0,
        June:0,
        July:0,
        August:0,
        September:0,
        October:0,
        November:0,
        December:0
        },
      interview:{
        January:0,
        February:0,
        March:0,
        April:0,
        May:0,
        June:0,
        July:0,
        August:0,
        September:0,
        October:0,
        November:0,
        December:0
        },
      onboard:{
        January:0,
        February:0,
        March:0,
        April:0,
        May:0,
        June:0,
        July:0,
        August:0,
        September:0,
        October:0,
        November:0,
        December:0
        },
      scanning:{
        January:0,
        February:0,
        March:0,
        April:0,
        May:0,
        June:0,
        July:0,
        August:0,
        September:0,
        October:0,
        November:0,
        December:0
        }
    }
    if(userdata){
        for(const i of userdata){
          if(i.status){
            if(i.status === 'Interviewed'){
              if(i.updatedAt){
                const v = i.updatedAt.split('-')
                if(v[1] < 10){
                  const value = parseInt(v[1].toString().slice(1));
                  const mnth = months[value-1]
                  anobj = {...anobj,interview:{...anobj["interview"],[mnth]:anobj.interview[mnth] + 1}}          
                }
              }
            }
            // i.status === 'Onboard'
            if(i.status === 'Onboard'){
              if(i.updatedAt){
                const v = i.updatedAt.split('-')
                if(v[1] < 10){
                  const value = parseInt(v[1].toString().slice(1));
                  const mnth = months[value-1]
                  anobj = {...anobj,onboard:{...anobj["onboard"],[mnth]:anobj.onboard[mnth] + 1}}          
                }
              }
            }

            if(i.status === 'New Jobs'){
              if(i.updatedAt){
                const v = i.updatedAt.split('-')
                if(v[1] < 10){
                  const value = parseInt(v[1].toString().slice(1));
                  const mnth = months[value-1]
                  anobj = {...anobj,newjob:{...anobj["newjob"],[mnth]:anobj.newjob[mnth] + 1}}           
                }
              }
            }
            // i.status === 'Scanning'
            if(i.status === 'Scanning'){
              if(i.updatedAt){
                const v = i.updatedAt.split('-')
                if(v[1] < 10){
                  const value = parseInt(v[1].toString().slice(1));
                  const mnth = months[value-1]
                  anobj = {...anobj,scanning:{...anobj["scanning"],[mnth]:anobj.scanning[mnth] + 1}}          
                }
              }
            }           
          }
        }
       
        setUserinfo(anobj)
    }
  },[userdata])

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
    <>
      <Container className="pt-7 bg-gradient-info pb-2" fluid>
      <div className='mt-1 ml-3 mb-4' >
      <Row>
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
          <Card 
          className="card-stats ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Candidate
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {userdata.length}              
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Card className="card-stats ml-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Goals
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {goal?goal.goals:0}             
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                </motion.div>
                </Row>
                </div>
          <div>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Report of candidates</h3>
              </CardHeader>
              <Bar options={options} data={data} />
            </Card>
          </div>         
          
      </Container>
    </>
  );
};

export default Report;
