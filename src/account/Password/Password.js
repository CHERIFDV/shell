import React, { useState } from 'react';
import { Button, } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import LoadingPage from "../../loading/LoadingPage";
import {  notification } from 'antd';
import {SecurityScanOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import './Password.scss';
import axios from'axios';

const schema = yup.object().shape({
  Password: yup.string() .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  npassword: yup.string() .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  apassword: yup.string() .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  
});
function Password () {
  const [loading,setloading]=useState(false);
  const [afpassword,setafpassword]=useState('password');
  const [afpassword1,setafpassword1]=useState('password');
  const [icons1,seticon1]=useState(<EyeOutlined/>);
  const [icons,seticon]=useState(<EyeOutlined/>);
  const changpass=()=>{
    if(afpassword==="password"){
      setafpassword("text")
      seticon(<EyeInvisibleOutlined/>)
    }else{
        setafpassword("password")
        seticon(<EyeOutlined/>)
    }
  }
  const changpass1=()=>{
    if(afpassword1==="password"){
      setafpassword1("text")
      seticon1(<EyeInvisibleOutlined/>)
    }else{
        setafpassword1("password")
        seticon1(<EyeOutlined/>)
    }
  }
  return (
    < >
     {loading?<LoadingPage/>:<></>}
     <Formik
     className="pasword"
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
        if (value.cnpassword==""||value.npassword==""||value.apassword=="") {
          notification["error"]({
            message: 'Error',
            description:
              " the inputs null",
          });
          }else
          if (value.npassword!=value.cnpassword) {
           
            notification["warning"]({
              message: 'Confirm password',
              description:
                "the new Password and the confirme password not the same",
            });
        
          }else{
            setloading(true)
           axios.put("/api/auth/update_profile/"+JSON.parse(localStorage.getItem("user")).id,{current_password:value.apassword,new_password:value.npassword},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
           .then(response => { 
            setloading(false)
            notification[response.data.type]({
              message: 'Update',
              description:
                response.data.message,
            });
        
          })
          .catch(error => {
            setloading(false)
          });     
        } 

    }
      }
      initialValues={{
        Password:'',
        npassword:'',
        apassword:'',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
   
        <form className="Register" noValidate onSubmit={handleSubmit}>
         
          <div>
          <div  controlId="validationFormikUsername2">
              <span>Password</span>
              <div hasValidation>
                <div>
                  <span id="inputGroupPrepend"><SecurityScanOutlined /></span>
                </div>
                <input
                  type={afpassword1}
                  placeholder="Mot de passe"
                  aria-describedby="inputGroupPrepend"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                  isValid={touched.Password && !errors.Password}
                  isInvalid={touched.Password && !!errors.Password}
                />
                <p type="invalid" tooltip>
                  {errors.Password}
                </p>
                <div>
                  <span id="inputGroupPrepend" onClick={changpass1}>{icons1}</span>
                </div>
              </div>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>Password</span>
              <div hasValidation>
                <div>
                  <span id="inputGroupPrepend"><SecurityScanOutlined /></span>
                </div>
                <input
                  type={afpassword}
                  placeholder="Mot de passe"
                  aria-describedby="inputGroupPrepend"
                  name="npassword"
                  value={values.npassword}
                  onChange={handleChange}
                  isValid={touched.npassword && !errors.npassword}
                  isInvalid={touched.npassword && !!errors.npassword}
                />
                <p type="invalid" tooltip>
                  {errors.npassword}
                </p>
                <div>
                  <span id="inputGroupPrepend" onClick={changpass}>{icons}</span>
                </div>
              </div>
            </div>
            <div  controlId="validationFormikUsername2">
              <span>Password</span>
              <div hasValidation>
                <div>
                  <span id="inputGroupPrepend"><SecurityScanOutlined /></span>
                </div>
                <input
                  type={afpassword}
                  placeholder="Mot de passe"
                  aria-describedby="inputGroupPrepend"
                  name="apassword"
                  value={values.apassword}
                  onChange={handleChange}
                  isValid={touched.apassword && !errors.apassword}
                  isInvalid={touched.apassword && !!errors.apassword}
                />
                <p type="invalid" tooltip>
                  {errors.apassword}
                </p>
                
              </div>
              
              
            </div>
          </div>
         
          <Button type="submit">Envoyer</Button>
        </form>

      )}
    </Formik>
    </>
  );
};

export default Password;
