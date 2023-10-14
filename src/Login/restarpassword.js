import React, { useState } from 'react';
import { Button, } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import LoadingPage from "./../loading/LoadingPage";
import {  notification } from 'antd';
import {SecurityScanOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import axios from'axios';
import {  useNavigate, useLocation } from "react-router-dom";

const schema = yup.object().shape({
  code: yup.string() .required('Please Enter your password')
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
function Password (props) {
    
  const [loading,setloading]=useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  let { from } = location.state || { from: { pathname: "/login" } };
  const [afpassword,setafpassword]=useState('password');
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
  
    
    return (
      < >
       {loading?<LoadingPage/>:<></>}
       <Formik
       className="pasword"
        validationSchema={schema}
        onSubmit={(value,{resetForm})=>{
          setloading(true)
          if (value.code==""||value.npassword==""||value.apassword=="") {
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
              setloading(true)
              axios.put("/api/auth/updatepassword",{id:props.match.params.id,new_password:value.npassword,code:value.code})
              .then(response => { 
               setloading(false)
               notification[response.data.type]({
                 message: 'Update',
                 description:
                   response.data.message,
               });
               navigate(from);  
               if(response.data.status){
                 navigate(from);
               }
           
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
                <span>Code</span>
                <div hasValidation>
                  <div>
                    <span id="inputGroupPrepend"><SecurityScanOutlined /></span>
                  </div>
                  <input
                    type="text"
                    placeholder="code"
                    aria-describedby="inputGroupPrepend"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    isValid={touched.code && !errors.code}
                    isInvalid={touched.code && !!errors.code}
                  />
                  <p type="invalid" tooltip>
                    {errors.code}
                  </p>

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
