import React,{useContext, useState,useEffect} from 'react'
import validator from 'validator';




const contextCreate = React.createContext()

export const Contextapiis = ({children})=>{
    
    const [obj, setObj] = useState({
	    fullname:'',
	    emails:'',
        phone:'',
	    experience:'0',
	    currentctc:'0',
	    expectedctc:'0',
        status:'',
        medium:'',
        note:'',
        filename:''
	  });

    const [excut,setExecut] = useState(true)

    const [therating,setTherating] = useState(0)

      const [goalset,setGoalset] = useState({
          goalis:'',
          hiringis:''
      })

      const [objskill,setObjskill] = useState('')

      const [auth,setAuth] = useState(localStorage.getItem("access"))

      const [id,setId] = useState('');
      const [loginmessage,setLoginmessage] = useState('')
      const [userlogin,setUserlogin] = useState(false)



      //for user
      const [validval,setValidval] = useState({
        fullname:false,
	    emails:false,
	    experience:false,
	    currentctc:false,
	    expectedctc:false,
	    skilltag:false,
        phone:false,
        note:false,
        status:false,
        rating:false,
        medium:false
      })

      const [adminresp,setAdminresp] = useState(false) 
      const [submitbt,setSubmitbtn] = useState(false)
      const [goal,setGoal] = useState(null)

      const [adminsign,setAdminsign] = useState({
        name:"",
        email:"",
        password:"",
        confirm:""
        })

    var accessing = false

    //for admin 
    const [uservalid,setUservalid] = useState({
        name:false,
        email:false,
        password:false,
        confirm:false
    })


    const [userdata,setUserdata] = useState(null)
    const [response,setResponse] = useState(false)
    const [success,setSuccess] = useState(false)

    const [message,setMessage] = useState({
        fullname:'',
        emails:'',
        confirm:'',
        emessage:''
    })

    //id change
    const idchange = (idis) =>{
        setId(idis)
    }

    const settingauth = (val)=>{
        setAuth(val)
    }

    //goalseting
    const goalsetting = (e)=>{
        e.preventDefault()
        setGoalset({...goalset,[e.target.id]:e.target.value})
       
    }
    //logout
    const logoutwhen = async(e)=>{
           e.preventDefault()
        await fetch('https://ats-application-new.herokuapp.com/api/auth/signout',{
                method:'DELETE',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:login.email})
            })

            localStorage.clear()
            setLoginmessage('')
            setAuth('')
            setLoginmessage("Successfully Logout from all devices")
    }




    //handling navbar in table
    const [navshow,setNavshow] = useState(false)

    const shownav = (val) =>{
        return setNavshow(val)
    }

    const [login,setLogin] = useState({
        email:"",
        password:""
    })

    const [logintrue,setLogintrue] = useState({
        email:false,
        password:false
    })

    //handlelogin
    const handlelogin = (e) =>{
        let val = e.target.value
        if(e.target.id === 'email'){
            if(!validator.isEmail(val)){
                setLogintrue({...logintrue,email:true})
                return setLogin({...login,email:e.target.value})
            }
            setLogintrue({...logintrue,email:false})
            return setLogin({...login,email:e.target.value})
        }
        if(e.target.id === 'password'){

            if(val.length < 5 && val.length > 0 ){
                setLogintrue({...logintrue,password:true})
                return setLogin({...login,[e.target.id]:e.target.value})

            }
            setLogintrue({...logintrue,password:false})
            return setLogin({...login,[e.target.id]:e.target.value})
        }
    }

    const vanishlogin = ()=>{
        setLogin({email:'',password:''})
    } 


    //seting up goal
    const settingupgoal = async()=>{

         await fetch('https://ats-application-new.herokuapp.com/goals',{
                method:'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({goals:goalset.goalis,totalHiring:goalset.hiringis})
            })

    }


        //logout
        const logout = async()=>{
            const emailis = localStorage.getItem('email')
            await fetch('https://ats-application-new.herokuapp.com/api/auth/signout',{
                method:'DELETE',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:emailis})
            })
            localStorage.clear()
            setLoginmessage('')
            setAuth('')
        }

    //login
    const log_in = async(e) =>{
        e.preventDefault()
        setLoginmessage('')
        if(login.email === ''){
            return setLogintrue({...logintrue,email:true})
        }
        if(login.password === ''){
            return setLogintrue({...logintrue,password:true})
        }
        if(!logintrue.email && !logintrue.password){
            const apireq = await fetch('https://ats-application-new.herokuapp.com/signin',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:login.email,password:login.password})
            });
            const val = await apireq.json()
    
            if(val.message === "user doesnt exist"){
                return setLoginmessage("Email id is not valid")
            }else if(val.message === "user wrong password"){
                return setLoginmessage("Password is wrong")
            }
            if(val.auth === "Error : please sign out first or rest password"){
                return setLoginmessage('Error: User is logged in other device')
            }
            if(val){
                localStorage.setItem("access",val.token)
                localStorage.setItem("email",val.email)
                localStorage.setItem("fullname",val.fullname)
                localStorage.setItem("refresh",val.tokenRefresh)
                setAuth(localStorage.getItem('access'))                
            }
        }
    }

    const updatingobj = (data) =>{
        
        if(data === ''){
            return setObj( { fullname:'',
            emails:'',
            phone:'',
            experience:'0',
            currentctc:'0',
            expectedctc:'0',
            status:'',
            medium:'',
            note:''
            })
        }
        setObj({
            fullname:data.fullname,
            emails:data.email,
            phone:data.phoneNumber,
            experience:data.experience,
            currentctc:data.currentCTC,
            expectedctc:data.expectedCTC,
            status:data.status,
            medium:data.mediumFrom,
            note:data.adminNote,
            filename:data.filename
        })
    
        if(data.rating){
            
            setTherating(data.rating)
        }
        if(data.skilltags){
            setExecut(false)
            setObjskill(data.skilltags)
        }
    }

    const handleskilltag = (tags) =>{
        let arr = tags.toString()
        setExecut(true)
        // if(arr !== objskill){
        //     return setObjskill(arr);
        // }
        setObjskill(arr);
    }

    const handlerating = (rate) =>{
       setTherating(rate)
    } 


    //handlechange
    const handlechange = (e) => {
        setSubmitbtn(false)
        if(e.target.id === 'experience' || e.target.id === 'currentctc' || e.target.id === 'expectedctc' || e.target.id === 'rating'){
            //validation for rating
            if(isNaN(e.target.value)){
                return
            }
            if(e.target.value === ''){
                return setObj({...obj,[e.target.id]: "0"})
            }
            return setObj({...obj,[e.target.id]: parseInt(e.target.value)})
            
        }

        if(e.target.id === 'fullname'){
            if(e.target.value.length > 5){
                setValidval((value)=>({...value,fullname:false}))
            }
            if(e.target.value === ''){
                setMessage((mes)=>({...mes,fullname:""}))
                }
            }

        //validation for email
        if(e.target.id === 'emails'){
            if(e.target.value.length > 5){
                setValidval((value)=>({...value,emails:false}))
                }
            }

        //validation for phone
        if(e.target.id === 'phone'){
            if(e.target.value.length <= 9){
                setValidval((value)=>({...value,phone:true}))
            }else{
                setValidval((value)=>({...value,phone:false}))
            }
            if(isNaN(e.target.value)){
                return
            }
            if(e.target.value.length === 11 ){
                return
            }

        }



        //validation for status
        if(e.target.id === 'status'){
            if(e.target.value.length > 0){
                setValidval((value)=>({...value,status:false}))
            }

        }

        //validation for rating
        if(e.target.id === 'rating'){
            if(e.target.value.length > 0){
                setValidval((value)=>({...value,rating:false}))
            }

        }
    
        //validation for medium
        if(e.target.id === 'medium'){
            if(e.target.value.length > 0){
                setValidval((value)=>({...value,medium:false}))
            }

        }

        //validation for skilltag
        if(e.target.id === 'note'){
            if(e.target.value.length > 0){
                setValidval((value)=>({...value,note:false}))
            }

        }

         if(e.target.id !== 'skilltag'){
            setExecut(true)
            setObj({ ...obj, [e.target.id]: e.target.value });
         }   
      };



      //sign up change

      const signupchange = (e) => {
          if(e.target.id === "password"){
              let value = e.target.value
            if(value.length < 5 && value.length > 0){
                setUservalid((value)=>({...value,password:true}))
                accessing = true
                return setAdminsign({ ...adminsign, [e.target.id]: e.target.value });
            }
          }
          if(e.target.id === 'confirm'){
            let val = e.target.value
            if(val !== adminsign.password){
                setUservalid({...uservalid,confirm:true})
                setMessage({...message,confirm:"Password should be identical"})
                accessing = true
                return setAdminsign({ ...adminsign, [e.target.id]: e.target.value });
            }
          }
          if(e.target.id === 'emails'){
            let val = e.target.value
            if(!validator.isEmail(val)){
                setUservalid({...uservalid,email:true})
                accessing = true
                return setAdminsign({ ...adminsign, [e.target.id]: val });
            }
            setUservalid((value)=>({...value,email:false}))
          }
        accessing = false
        setUservalid((value)=>({...value,[e.target.id]:false}))
        setAdminsign({ ...adminsign, [e.target.id]: e.target.value });
      };


      // api

      // dashboard api
      const dashboard = async() => {
        let token = await localStorage.getItem("access")
        const inf = await localStorage.getItem("refresh")

        let goals = await fetch("https://ats-application-new.herokuapp.com/goals",{
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        })
        let goalresponse = await goals.json()
        
        if(goalresponse){
            setGoal(goalresponse)
        }
            try{
                let dashapi = await fetch("https://ats-application-new.herokuapp.com/getCandidates",{
                    method:'GET',
                    headers:{
                        'content-type':'application/json',
                        'Authorization' : 'Bearer ' + String(token)
                    },
        

                })
                
                let resp = await dashapi.json()              
                if(resp){
                    setUserdata(resp.reverse())
                }
            }
            catch(error){
                
                if(token){
                const val = await fetch("https://ats-application-new.herokuapp.com/api/auth/refreshtoken",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({'refreshToken':inf})
                })
                let value = await val.json()
                localStorage.removeItem("access")
                localStorage.setItem("access",value.accessToken)
                dashboard()

                }

            }

    }



    //admin validation
    const handleuservalidation = ()=>{
        for (let property in uservalid){
            if(property === 'name'){
                let value = adminsign[property]
                if(value.length < 5 && (value.length > 0 || value === '')){
                    setUservalid((value)=>({...value,[property]:true}))
                    return "dont go"
                }       
            
            }

            if(property === 'email'){
                let value = adminsign[property]
                if(value === '' || !validator.isEmail(value)){
                    setUservalid((value)=>({...value,[property]:true}))
                    return 'dont go'
                }
            }

            if(property === 'password'){
                let value = adminsign[property]
                if(value === ''){
                    setUservalid((value)=>({...value,[property]:true}))
                    return "dont go"
                }       
            }

            if(property === 'confirm'){
                let value = adminsign[property]
                if(adminsign.password !== value){
                    setUservalid((value)=>({...value,[property]:true}))
                    return "dont go"
                    }       
                }

                setUservalid((value)=>({...value,[property]:false}))
            }
            accessing = false
            return "go"
        }


    //signup
    const handlesignup = async(e) => {
        e.preventDefault();
        setAdminresp(false)
        let reflection = await handleuservalidation()
        if(reflection === "dont go"){
            return 
        }
        if(accessing){
            return
        }

        let datais = {
            fullname:adminsign.name,
            email:adminsign.email,
            password:adminsign.password,
            confirmpassword:adminsign.confirm
        }
        let updating = await fetch("https://ats-application-new.herokuapp.com/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(datais)

        })
        const resp = await updating.json()
        if(resp.message === 'user already exist'){
            setUserlogin(false)
            return setAdminresp(true)
        }
        if(resp){
            localStorage.clear()
        
            setAdminresp(false)
            setUserlogin(true)
            }
        }

        const [realfile,setRealfile] = useState([])

        const fileis = (files)=>{
            return setRealfile(files)
        }




        //handle validation of user
        const handlevalidation = ()=>{
            setSubmitbtn(false)

            for (let property in obj){
                if(property === 'fullname'){
                    let value = obj[property]
                    if(value.length < 6 && value.length > 0 ){
                        setMessage((mes)=>({...mes,fullname:"It should be more than 5 char"}))
                        setValidval((value)=>({...value,[property]:true}))
                        return "dont go"
                    }       
                
                }

                if(property === 'experience'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }
                
                if(property === 'emails'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                    if(!validator.isEmail(value)){
                        
                        setValidval((value)=>({...value,emails:true}))
                        return "dont go"
                    }
                }


                if(property === 'currentctc'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'expectedctc'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'status'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'rating'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'medium'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'note'){
                    let value = obj[property]
                    if(value !== ''){
                        setValidval((value)=>({...value,[property]:false}))
                    }
                }

                if(property === 'phone'){
                    let value = obj[property]
                    if(value.length < 9 && value.length > 0 ){
                        setValidval((value)=>({...value,[property]:true}))
                        return "dont go"
                    }       
                }

                if(obj[property]===''){
                    setValidval((value)=>({...value,[property]:true}))
                    return "dont go"
                }
            }
            return "go"
        }

        const responseis = (val)=>{

            return setResponse(val)
        }


        const exeis = (val)=>{
            setExecut(val)
        }

        const successis = (val)=>{      
            return setSuccess(val)
        }

        //for registering the user
        const handlesubmit = async (e) => {
            e.preventDefault()

            let apis = 'https://ats-application-new.herokuapp.com/addCandidate'
            if(id !== ''){
                apis = `https://ats-application-new.herokuapp.com/updateCandidate${id}`
            }
            let methods = id ? "PATCH" : "POST"

            let reflection = await handlevalidation()
            if(reflection === "dont go"){
                return 
            }
                const {fullname,emails,experience,currentctc,
                    expectedctc,note,phone,status,medium} = obj

                let datas = {
                    fullname:fullname,
                    email:emails,
                    phoneNumber:phone,
                    experience:experience,
                    currentCTC:currentctc,
                    expectedCTC:expectedctc,
                    skilltags:objskill,
                    adminNote:note,
                    status:status,
                    rating:therating,
                    mediumFrom:medium,
                    cv:realfile.base64,
                    filename:realfile.name
                }


                try{
                    let req = await fetch(apis,{
                        method:methods,
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(datas)
                    })
                    const res = await req.json()
                    if(res.message === 'candidate already exist in database'){
                        setResponse(true)
                        setSuccess(false)
                    }else{
                        if(res){
                            setObj({
                                fullname:'',
                                emails:'',
                                phone:'',
                                experience:'0',
                                currentctc:'0',
                                expectedctc:'0',
                                status:'',
                                rating:'1',
                                medium:'',
                                note:''
                            })
                            setObjskill('php') 
                            setTherating(0)
                            setSuccess(true)
                            setId('')
                            setExecut(true)
                        }
                        setResponse(false)
                    }
                
                }
                catch(error){
                    console.log(error)
                }  
            }
            

        // <a download=pdfTitle href=pdfData title='Download pdf document' />
        //where pdfData works as realfile.base64

    useEffect(()=>{
        dashboard()
    },[])

    return(
        <contextCreate.Provider value={{
            obj,handlechange,handlesubmit,handlesignup,signupchange,adminsign,navshow,shownav,
            userdata,logintrue,log_in,fileis,login,logoutwhen,validval,message,response,responseis,
            handlelogin,updatingobj,userlogin,success,successis,handleskilltag,dashboard,idchange,
            uservalid,goal,handlerating,adminresp,submitbt,logout,auth,id,settingauth,goalset,loginmessage,
            therating,goalsetting,settingupgoal,objskill,vanishlogin,excut,exeis
        }}>
            {children}
        </contextCreate.Provider>
    )
}

export const useApi = ()=>{
    return useContext(contextCreate);
}
