import React, { useState } from 'react';
import { InputGroup,Button, Input  } from 'reactstrap';
import LoadingPage from "../../loading/LoadingPage";
import {  notification } from 'antd';
import {  useHistory, useLocation } from "react-router-dom";
import axios from'axios';
function Password (props) {
    

  const [state, setState] = useState({npassword:"",apassword:"",code:""})
  const [loading,setloading]=useState(false);
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value,    })  
    
  }
  let location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/employe/loginem" } };
    const handleSubmit= (e) =>{
      if (state.code==""||state.npassword==""||state.apassword=="") {
      notification["error"]({
        message: 'Error',
        description:
          " the inputs null",
      });
      }else
      if (state.npassword!=state.apassword) {
       
        notification["warning"]({
          message: 'Confirm password',
          description:
            "the new Password and the confirme password not the same",
        });
       
      }else{
        setloading(true)
       axios.put("/api/personnel/updatepassword",{id:props.match.params.id,new_password:state.npassword,code:state.code})
       .then(response => { 
        setloading(false)
        notification[response.data.type]({
          message: 'Update',
          description:
            response.data.message,
        });
        if(response.data.status){
          history.push(from);
        }
      })
      .catch(error => {
            setloading(false)
      });     
    } 
    }
  return (
    <div className="pasword">{loading?<LoadingPage/> :<></>}
      <InputGroup>
        <Input type="text" className="pinput" name="code" placeholder="Votre code de verification" value={state.code} onChange={handleChange} />
      </InputGroup>
      <br />
      <InputGroup>
        <Input type="password" className="pinput" name="npassword" placeholder="New Password" value={state.npassword} onChange={handleChange} />
      </InputGroup>
      <br/>
      <InputGroup>
        <Input  type="password" className="pinput" name="apassword" placeholder="confirme New Password" value={state.apassword} onChange={handleChange}  />
      </InputGroup>
      <br/>
      <Button onClick={handleSubmit} >Send</Button>{' '}
    </div>
  );
};

export default Password;
