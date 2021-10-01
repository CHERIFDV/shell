

import { Button,Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import './reserve.scss';
import { useState } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";
import {  notification} from 'antd';


const schema = yup.object().shape({
  model: yup.string().required(),
  matricule: yup.string().required(),
  description: yup.string().required(),
  nom: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  prenom: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  tel:  yup.number().required(),
  terms: yup.bool().required().oneOf([true], 'il faut accepter tous les termes'),
});


function Register() {
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
  const [loading,setloading]=useState(false);
  return (<>{loading?<LoadingPage/> :<></>}
    <Formik
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
        axios.post('/api/reservation/add_reservation',{model:value.model,description:value.description,matricule:value.matricule,cin:JSON.parse(localStorage.getItem("user")).cin,tel:value.tel,prenom:value.prenom,nom:value.nom})
       .then(response => { 
        setloading(false)
        resetForm({values:""})
        notification[response.data.type]({
          message: 'Warning',
          description:response.data.message
           ,
        });
      })
      .catch(error => {
          console.log(error)
      });     
      } }
      initialValues={{
        model: '',
        matricule: '',
        description:'',
        nom: "",
        prenom: "",
        tel:"",
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
   
        <Form className="reserve" noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
          <Form.Group controlId="validationFormik102">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isValid={touched.nom && !errors.nom}
                isInvalid={touched.nom && !!errors.nom}
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={values.prenom}
                onChange={handleChange}
                isValid={touched.prenom && !errors.prenom}
                isInvalid={touched.prenom && !!errors.prenom}
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                type="text"
                name="tel"
                value={values.tel}
                onChange={handleChange}
                isValid={touched.tel && !errors.tel}
                isInvalid={touched.tel && !!errors.tel}
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Modele</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={values.model}
                onChange={handleChange}
                isValid={touched.model && !errors.model}
                isInvalid={touched.model && !!errors.model}
              />
              
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                type="text"
                name="matricule"
                value={values.matricule}
                onChange={handleChange}
                isValid={touched.matricule && !errors.matricule}
                isInvalid={touched.matricule && !!errors.matricule}
              />

                <Form.Label>Description</Form.Label>
            </Form.Group>
         
            <textarea
                type="textarea"
                name="description"
               
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && !!errors.description}
                
              />
            
          </Form.Row>
    

          <Form.Group>
            <Form.Check
              required
              name="terms"
              label=" Accepter les termes et les conditions"
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
