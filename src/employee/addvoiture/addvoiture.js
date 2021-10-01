

import { Button,Form,InputGroup } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { Formik } from "formik";
import * as yup from "yup";
import './addvoiture.scss';
import React, { useState } from 'react';
import axios from'axios';
import { format } from 'date-fns';
import { useHistory, useLocation } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
const voiture = yup.object().shape({
  marque: yup.string().required(),
  version: yup.string().required(),
  matricule: yup.string().required(),
  model: yup.string().required(),
  type: yup.string().required(),
  nserie: yup.string().required(),
  codedemarage: yup.string().required(),
  antivolderoues: yup.string().required(),
});


function Register(props) {
  const history = useHistory();
  const location = useLocation();
  const [date,setdate]=useState("");
  const { state } = props.location
  console.log(state)
  var mod=""
  var mat=""

if(state.s){

  mod=state.s.model;
  mat=state.s.matricule;
}
const [loading,setloading]=useState(false);
  return (
      <>{loading?<LoadingPage/> :<></>}


    <Formik
      validationSchema={voiture}
      onSubmit={(value,{resetForm})=>{
        
        setloading(true)
        axios.post('../api/voiture/add_voiture',{
          marque:value.marque,
          serie:value.nserie,
          model:value.model,
          version:value.version,
          type:value.type,
          num_immatriculation:value.matricule,
          date_1_er_mise_en_circulation:format(new Date(date),'yyyy/MM/dd'),
          code_demarrage:value.codedemarage,
          antivol_roues:value.antivolderoues,
          client_id:state.id},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       let { from } =  { from: { pathname: "./ORvoiture",state:{id:response.data[0]}}};
       history.push(from); 
     })
     .catch(error => {
      setloading(false)
         console.log(error)
     });  
    }
      }
      initialValues={{
        marque:'',
        version: '',
        matricule:  mat,
        model:mod,
        type:'',
        nserie:'',
        codedemarage:'',
        antivolderoues:'',
        date_1_er_mise_en_circulation:date,
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
   
        <Form className="addvoitur" noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                name="marque"
                value={values.marque}
                onChange={handleChange}
                isValid={touched.marque && !errors.marque}
                isInvalid={touched.marque && !!errors.marque}
              />
              
            </Form.Group>
            <Form.Group controlId="validationFormik102">
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
              <Form.Label>Version</Form.Label>
              <Form.Control
                type="text"
                name="version"
                value={values.version}
                onChange={handleChange}
                isValid={touched.version && !errors.version}
                isInvalid={touched.version && !!errors.version}
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={values.type}
                onChange={handleChange}
                isValid={touched.type && !errors.type}
                isInvalid={touched.type && !!errors.type}
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>date_1_er_mise_en_circulation:</Form.Label>
              <DatePicker
              name="date_1_er_mise_en_circulation"
              onChange={date => setdate(date._d)}
              
              />

             
            </Form.Group>
            <Form.Group controlId="validationFormik102">
              <Form.Label>N de Serie</Form.Label>
              <Form.Control
                type="text"
                name="nserie"
                value={values.nserie}
                onChange={handleChange}
                isValid={touched.nserie && !errors.nserie}
                isInvalid={touched.nserie && !!errors.nserie}
              />

             
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>N° D’IMMATRICULATION :</Form.Label>
              <InputGroup hasValidation>
              
                <Form.Control
                  type="text"
                  placeholder="Matricule"
                  aria-describedby="inputGroupPrepend"
                  name="matricule"
                  value={values.matricule}
                  onChange={handleChange}
                  isValid={touched.matricule && !errors.matricule}
                  isInvalid={touched.matricule && !!errors.matricule}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.matricule}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>


            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>CODE DÉMARRAGE :</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Model"
                  aria-describedby="inputGroupPrepend"
                  name="codedemarage"
                  value={values.codedemarage}
                  onChange={handleChange}
                  isValid={touched.codedemarage && !errors.codedemarage}
                  isInvalid={touched.codedemarage && !!errors.codedemarage}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.codedemarage}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

          </Form.Row>
          <Form.Row>
          <Form.Group  controlId="validationFormik103">
              <Form.Label>ANTIVOL DE ROUES :</Form.Label>
              <Form.Control
                type="number"
                placeholder="ANTIVOL DE ROUES "
                name="antivolderoues"
                value={values.antivolderoues}
                onChange={handleChange}
         
                isValid={touched.antivolderoues && !errors.antivolderoues}
                isInvalid={touched.antivolderoues && !!errors.antivolderoues}
              />

          
            </Form.Group>
          
                
          </Form.Row>
          <Button type="submit">Envoyer</Button>
        </Form>
      )}
    </Formik></>
  );
}


export default Register;
