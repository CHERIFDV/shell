import React, { useState } from 'react';
import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import LoadingPage from "./../loading/LoadingPage";
import {  notification } from 'antd';
import {SecurityScanOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import axios from'axios';
import {  useHistory, useLocation } from "react-router-dom";

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
  const history = useHistory();
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
               history.push(from);  
               if(response.data.status){
                 history.push(from);
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
          <Form className="Register" noValidate onSubmit={handleSubmit}>
            <Form.Row>
            <Form.Group  controlId="validationFormikUsername2">
                <Form.Label>Code</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend"><SecurityScanOutlined /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="code"
                    aria-describedby="inputGroupPrepend"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    isValid={touched.code && !errors.code}
                    isInvalid={touched.code && !!errors.code}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.code}
                  </Form.Control.Feedback>

                </InputGroup>
              </Form.Group>
              <Form.Group  controlId="validationFormikUsername2">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend"><SecurityScanOutlined /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={afpassword}
                    placeholder="Mot de passe"
                    aria-describedby="inputGroupPrepend"
                    name="npassword"
                    value={values.npassword}
                    onChange={handleChange}
                    isValid={touched.npassword && !errors.npassword}
                    isInvalid={touched.npassword && !!errors.npassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.npassword}
                  </Form.Control.Feedback>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend" onClick={changpass}>{icons}</InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
              <Form.Group  controlId="validationFormikUsername2">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend"><SecurityScanOutlined /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={afpassword}
                    placeholder="Mot de passe"
                    aria-describedby="inputGroupPrepend"
                    name="apassword"
                    value={values.apassword}
                    onChange={handleChange}
                    isValid={touched.apassword && !errors.apassword}
                    isInvalid={touched.apassword && !!errors.apassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.apassword}
                  </Form.Control.Feedback>
                  
                </InputGroup>
                
                
              </Form.Group>
            </Form.Row>
           
            <Button type="submit">Envoyer</Button>
          </Form>
  
        )}
      </Formik>
      </>
    );
};

export default Password;
