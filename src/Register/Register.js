

import { Button, } from 'react-bootstrap';
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
   
        <form className="Register" noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>First name</span>
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              
            </div>
            <div controlId="validationFormik102">
              <span>Last name</span>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />

             
            </div>
            <div  controlId="validationFormikUsername2">
              <span>Email</span>
              <div hasValidation>
                <div>
                  <span id="inputGroupPrepend">@</span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                <p type="invalid" tooltip>
                  {errors.username}
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
                  placeholder="Password"
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
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="Password1"
                  value={values.Password1}
                  onChange={handleChange}
                  isValid={touched.Password1 && !errors.Password1}
                  isInvalid={touched.Password1 && !!errors.Password1}
                />
                <p type="invalid" tooltip>
                  {errors.Password1}
                </p>
                
              </div>
              
              
            </div>
          </div>
          <div>
          <div  controlId="validationFormik103">
              <span>Cin</span>
              <input
                type="number"
                placeholder="Cin"
                name="cin"
                value={values.cin}
                onChange={handleChange}
         
                isValid={touched.cin && !errors.cin}
                isInvalid={touched.cin && !!errors.cin}
              />

          
            </div>
            <div  controlId="validationFormik103">
              <span>Tel</span>
              <input
                type="number"
                placeholder="Tel"
                name="tel"
                value={values.tel}
                onChange={handleChange}
         
                isValid={touched.tel && !errors.tel}
                isInvalid={touched.tel && !!errors.tel}
              />

          
            </div>
            <div  controlId="validationFormik103">
              <span>City</span>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
         
                isValid={touched.city && !errors.city}
                isInvalid={touched.city && !!errors.city}
              />

          
            </div>
            <div  controlId="validationFormik104">
              <span>State</span>
              <input
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
               
                isValid={touched.state && !errors.state}
                isInvalid={touched.state && !!errors.state}
              />
             
            </div>
            <div  controlId="validationFormik105">
              <span>Zip</span>
              <input
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isValid={touched.zip && !errors.zip}
                isInvalid={touched.zip && !!errors.zip}
          
              />

              
            </div>
          </div>

         

          {/* <div>
            <div
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
          </div> */}
          <Button type="submit">Envoyer</Button>
  
         
          
        </form>
    

      )}
    </Formik></>
  );
}


export default Register;
