import React ,{useEffect}from "react";
import { useLocation,useHistory } from "react-router-dom";

// import components
import Routes from "./routes";
import Navbar from'../Navbar/Navbar';
import Navbara from'../Admin/Navbar';
import Photo from'../employee/addvoiture/photo';
import Employee from'../employee/employee';
import axios from'axios';
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
export default function MainInterface(props) {
  const history = useHistory();
    const location = useLocation();
    
      
        let { from } = location.state || { from: { pathname: "/login" } };
        let { from1 } = location.state || { from: { pathname: "/employe/loginem" } };
        const user=JSON.parse(localStorage.getItem("user"))
        const emp=JSON.parse(localStorage.getItem("emp"))
        useEffect(()=>{ 
          if (user!=null) {
          axios.get('/api/admin/get_user_connected/'+user.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
          .then(response => { 
            if(!response.data.status){
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              history.push(from);  
            } 
         }).catch(response => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          history.push(from);  
          
         })
        }
        if (emp!=null) {
          axios.get('/api/personnel/get_employe_connected/'+emp.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
          .then(response => { 
            if(!response.data.status){
              localStorage.removeItem("tokenemp")
              localStorage.removeItem("emp")
              history.push(from1);  
            }console.log(response.message)
            if(response.message==="Unauthenticated"){
              history.push(from1);  
            }
         }).catch(response => {
          history.push(from1);  
          window.location.reload();
    
         })
        }
         return ()=>{            
       }
       },[location])
  const path = useLocation();
  return (
    <>
            {path.pathname.includes("/employe")  ? <Employee/>:
             path.pathname === "/404" || path.pathname === "/login" ? ( "" ) : path.pathname.includes("/admin") ? (
             <>{user==null||user.role_as!=="admin" ?  history.replace(from) :<Navbara/>} </>
               ) : <Navbar /> // render navbar based on path
              }
         
            
      
    </>
  );
}