

import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import LoadingPage from "../loading/LoadingPage";
import {SecurityScanOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import './Register.scss';
import { useState } from 'react';
import axios from'axios';
import { useNavigate, useLocation } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  lastName: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  username: yup.string().required(),
  Password: yup.string() .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  Password1:  yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
  cin: yup.number().required(),
  tel: yup.number().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.number().required(),
  terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
});

function Register() {
  const [loading,setloading]=useState(false);
  const [afpassword,setafpassword]=useState('password');
  const [icons,seticon]=useState(<EyeOutlined/>);
  const navigate = useNavigate();
  const location = useLocation();
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
    <>{loading?<LoadingPage/> :<></>}
    <Formik
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
        if(value.Password===value.Password1){
        axios.post('/api/auth/register',{nom:value.firstName,prenom:value.lastName,cin:value.cin,tel:value.tel,email:value.username,password:value.Password,city:value.city,state:value.state,zip:value.zip})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
        let { from } = location.state || { from: { pathname: "/login" } };
        //navigate(from); 
     })
     .catch(error => {
         console.log(error)
     });  
      }else{

      }


    }
      }
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        Password:'',
        Password1:'',
        cin:'',
        tel:'',
        city: '',
        state: '',
        zip: '',
        terms: false,
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
            <Form.Group controlId="validationFormik101">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />

             
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
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
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                  isValid={touched.Password && !errors.Password}
                  isInvalid={touched.Password && !!errors.Password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Password}
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
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="Password1"
                  value={values.Password1}
                  onChange={handleChange}
                  isValid={touched.Password1 && !errors.Password1}
                  isInvalid={touched.Password1 && !!errors.Password1}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Password1}
                </Form.Control.Feedback>
                
              </InputGroup>
              
              
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group  controlId="validationFormik103">
              <Form.Label>Cin</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cin"
                name="cin"
                value={values.cin}
                onChange={handleChange}
         
                isValid={touched.cin && !errors.cin}
                isInvalid={touched.cin && !!errors.cin}
              />

          
            </Form.Group>
            <Form.Group  controlId="validationFormik103">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                type="number"
                placeholder="Tel"
                name="tel"
                value={values.tel}
                onChange={handleChange}
         
                isValid={touched.tel && !errors.tel}
                isInvalid={touched.tel && !!errors.tel}
              />

          
            </Form.Group>
            <Form.Group  controlId="validationFormik103">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
         
                isValid={touched.city && !errors.city}
                isInvalid={touched.city && !!errors.city}
              />

          
            </Form.Group>
            <Form.Group  controlId="validationFormik104">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
               
                isValid={touched.state && !errors.state}
                isInvalid={touched.state && !!errors.state}
              />
             
            </Form.Group>
            <Form.Group  controlId="validationFormik105">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isValid={touched.zip && !errors.zip}
                isInvalid={touched.zip && !!errors.zip}
          
              />

              
            </Form.Group>
          </Form.Row>

         

          <Form.Group>
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isValid={touched.terms && !errors.terms}
              isInvalid={touched.terms && !!errors.terms}
              feedback={errors.terms}
              id="validationFormik106"
              feedbackTooltip
            />
          </Form.Group>
          <Button type="submit">Envoyer</Button>
  
         
          
        </Form>
    

      )}
    </Formik></>
  );
}


export default Register;
