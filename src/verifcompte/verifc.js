import React, { useEffect } from 'react';
import axios from'axios';
import { useLocation,useNavigate } from "react-router-dom";
function Verifc (props){

    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/login" } };
useEffect(async ()=>{ 
  const {data}= await axios.get('/api/auth/verif_email/'+props.match.params.id)
 
  //navigate(from);  
  return ()=>{
      
}
},[])

return(
<></>
  
);}
export default Verifc; 