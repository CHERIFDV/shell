import React, { useEffect } from 'react';
import axios from'axios';
import { useLocation,useHistory } from "react-router-dom";
function Verifc (props){

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/login" } };
useEffect(async ()=>{ 
  const {data}= await axios.get('/api/auth/verif_email/'+props.match.params.id)
 
  history.push(from);  
  return ()=>{
      
}
},[])

return(
<></>
  
);}
export default Verifc; 