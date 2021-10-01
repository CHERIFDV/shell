
import React, { useState } from 'react';
import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import {  message,Space ,notification } from 'antd';
import './addclient.scss';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const schema = yup.object().shape({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  cin: yup.number().required(),
  tel: yup.number().required(),
});


function Registerclient() {
  const [loading,setloading]=useState(false);
  return (

    <>{loading?<LoadingPage/> :<></>}
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
      axios.post('/api/client/add_client',{nom:value.nom,prenom:value.prenom,cin:value.cin,tel:value.tel},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
       console.log(response)
       notification[response.data.status==true ? 'success' :'warning']({
        message: response.data.status==true ? 'success' :'warning',
        description:
        response.data.message,
      });
      resetForm({values:""})
     })
     .catch(error => {
      setloading(false)
         notification['warning']({
          message: "warning",
          description:
            'This is the content of the notification.',
        });
     });     
      console.log(value)
      }
      }
      initialValues={{
        nom:"",
        prenom:"",
        cin:"",
        tel:""
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
        <Space size={[18, 16]} wrap>
        <Form className="ajouteclient" noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isValid={touched.nom && !errors.nom}
                isInvalid={touched.nom && !!errors.nom}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nom}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={values.prenom}
                onChange={handleChange}
                isValid={touched.prenom && !errors.prenom}
                isInvalid={touched.prenom && !!errors.prenom}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.prenom}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>CIN</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  placeholder="CIN"
                  aria-describedby="inputGroupPrepend"
                  name="cin"
                  value={values.cin}
                  onChange={handleChange}
                  isValid={touched.cin && !errors.cin}
                  isInvalid={touched.cin && !!errors.cin}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.cin}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>TEL</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="tel"
                  aria-describedby="inputGroupPrepend"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
                  isValid={touched.tel && !errors.tel}
                  isInvalid={touched.tel && !!errors.tel}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.tel}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
         
       

          <Form.Group>
            
          
        
           
          </Form.Group>
          <Button type="submit">Envoyer</Button>
  
         
          
        </Form>
      </Space>

      )}
    </Formik></>
  );
}


export default Registerclient;
