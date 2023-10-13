

import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import {Space ,notification,Spin,Modal } from 'antd';
import './addclient.scss';
import axios from'axios';
import LoadingPage from "../../loading/LoadingPage";
import {SettingOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState,useEffect } from 'react';
const { confirm } = Modal;
const schema = yup.object().shape({
  nom: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  prenom: yup.string().required().matches(
    /^(?=.*[A-Za-z])[A-Za-z]{1,}$/
  ),
  cin: yup.number().required(),
  tel: yup.number().required(),
});

function Registerclient(props) {
  const navigate = useNavigate();
  const { state } = props.location
  const [loading,setloading] = useState(true);

  useEffect(()=>{
  if(state){
    setloading(true)
    axios.post('/api/client/add_client',{nom:state.nom,prenom:state.prenom,cin:state.cin,tel:state.tel},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
    .then(response => { 
      setloading(false)
     console.log(response)
     notification[response.data.status==true ? 'success' :'warning']({
      message: response.data.status==true ? 'success' :'warning',
      description:
      response.data.message,
    });
    if(response.data.status==true){
      console.log(response)
      
    let { from } =  { from: { pathname: "./addvoiture",state:{id:response.data[0],s:state}}};
    navigate(from); }
   })
   .catch(error => {
       console.log(error)
       setloading(false)
       notification['warning']({
        message: "warning",
        description:
          'This is the content of the notification.',
      });
   });  
  }else{

    setloading(false)
    confirm({
      title: 'est-ce que le client est dejat existé ?',
      icon: <ExclamationCircleOutlined />,
      content: 'si oui clicker sur OK',
      onOk() {
       let { from } =  { from: { pathname: "./listeclient"}};
       navigate(from); 
 
      },
      onCancel() {
      },
    });  
  }
  return ()=>{
      
  }
},[])


  return (
    <div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {loading ? <LoadingPage/>  : 
        <div   style={{textAlign:"left"}}>
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
      axios.post('/api/client/add_client',{nom:value.nom,prenom:value.prenom,cin:value.cin,tel:value.tel},{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenemp"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       console.log(response)
       notification[response.data.status==true ? 'success' :'warning']({
        message: response.data.status==true ? 'success' :'warning',
        description:
        response.data.message,
      });
      let { from } =  { from: { pathname: "./addvoiture",state:{id:response.data[0]}}};
      navigate(from); 


     })
     .catch(error => {
         console.log(error)
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
              <Form.Label>NOM</Form.Label>
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
    </Formik></div>}</div>
  );
}


export default Registerclient;
