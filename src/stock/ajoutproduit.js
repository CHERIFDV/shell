

import { Button,Form,Card,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import {  message,Space ,notification,Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ajoutproduit.scss';
import { useState } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";
const schema = yup.object().shape({
  Titre: yup.string().required(),
  Prix: yup.number().required(),
  Tva: yup.number().required(),
  
});


function Register() {
  const [reparation,setreparation]=useState({Titre:"",Prix:"",Tva:""});
  const [imageUrl,setimageUrl]=useState();
  const [photo,setphoto]=useState();
  const [valid,setvalid]=useState(true);
  const [loading,setloading]=useState(false);
  const handleChangep =(e) =>{ 
    if (e.file.size>1000000) {
      message.error('Image must smaller than 2MB!');
      setvalid(false)
      return
    }else{
      setvalid(true) 
    }
    setphoto(e.file) 
    
    if(valid)
    try{
      setimageUrl(window.URL.createObjectURL(e.file))}
    catch(TypeError){
           return
    }
   }
 
   const props = {
    onRemove: file => {
      setimageUrl(null)
      setphoto(null)
      setvalid(false)
    },
    beforeUpload: file => {
      return false;
    },
    imageUrl,
  }; 
  return (<>{loading?<LoadingPage/> :<></>}
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
  
      setreparation({Titre:value.Titre,Prix:value.Prix,Tva:value.Tva})
      if (valid) {
        setloading(true)
      const fd = new FormData();
      fd.append('image',photo);
      fd.append('designation',value.Titre);
      fd.append('price',value.Prix);
      fd.append('tva',value.Tva);
      fd.append('type',1);
      axios.post('/api/reparation/add_rep',fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
       console.log(response)
       notification['success']({
        message: "success",
        description:
          'This is the content of the notification.',
      });
      resetForm({values:""})
     })
     .catch(error => {
         console.log(error)
         notification['warning']({
          message: "warning",
          description:
            'This is the content of the notification.',
        });
     });     
    }else{
      message.error('Image must smaller than 2MB!');
    }
      }
      }
      initialValues={{
         Titre: reparation.Titre,
        Prix: reparation.Prix,
        Tva:reparation.Tva
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
        <Form className="ajoute" noValidate onSubmit={handleSubmit}>
         
          <Form.Row>
            <Form.Group controlId="validationFormik101">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="Titre"
                value={values.Titre}
                onChange={handleChange}
                isValid={touched.Titre && !errors.Titre}
                isInvalid={touched.Titre && !!errors.Titre}
              />
               <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Titre}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>PRIX</Form.Label>
              <InputGroup hasValidation>
               


                <Form.Control
                  type="number"
                  placeholder="Prix"
                  aria-describedby="inputGroupPrepend"
                  name="Prix"
                  value={values.Prix}
                  onChange={handleChange}
                  isValid={touched.Prix && !errors.Prix}
                  isInvalid={touched.Prix && !!errors.Prix}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Prix}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group  controlId="validationFormikUsername2">
              <Form.Label>TVA</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="TVA"
                  aria-describedby="inputGroupPrepend"
                  name="Tva"
                  value={values.Tva}
                  onChange={handleChange}
                  isValid={touched.Tva && !errors.Tva}
                  isInvalid={touched.Tva && !!errors.Tva}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Tva}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
         
       

          <Form.Group>
            
          
          <Upload 
             maxCount={1}
          {...props}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
           
          </Form.Group>
          <Button type="submit">Envoyer</Button>
  
         
          
        </Form>
        <div className="affiche">

            <Card style={{ width: '15rem' }}>
    <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
      <Card.Title>{reparation.Titre}</Card.Title>
        <Card.Text>
          <ul className="ulliste">
            <li> {reparation.Prix}</li>
            <li> {reparation.Tva}</li>
          </ul>
    
      </Card.Text>
   
      </Card.Body>
      </Card>
         </div>
      </Space>

      )}
    </Formik></>
  );
}


export default Register;
