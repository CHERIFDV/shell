

import { Button,Form,InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { message,Space ,Image,Upload} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import './addservice.scss';
import { useState,useEffect } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";






const schema = yup.object().shape({
  Titre: yup.string().required(),
  description: yup.string().required(),
  
});


function Modifservice(props) {
    const [Titre,setTitre]=useState(null);
    const [description,setdescription]=useState(null);
    

    const [photo,setphoto]=useState();
    const [valid,setvalid]=useState(true);
    const [imageUrl,setimageUrl]=useState();
    const handleChangep =(e) =>{ 
      if (e.file.size>100000) {
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
   
     const propss = {
      onRemove: file => {
        setimageUrl(null)
        setphoto(null)
        setvalid(false)
      },
      beforeUpload: file => {
        return false;
      },
    }; 
     
    useEffect( ()=>{ 
        const getdata=async()=>{
        const {data}= await axios.get('/api/service/get_service/'+props.match.params.id,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
        console.log(data)
        setTitre(data.titre)
        setdescription(data.description)
        setimageUrl(data.image)
       }
        getdata()
        return ()=>{
            
      }
      },[])

  
   
    const [loading,setloading]=useState(false);
  return (


<div style={{textAlign:"center"}}>{loading?<LoadingPage/> :<></>}
    {description==null ? <LoadingPage/> : 

<>
     <Image src={imageUrl}/>
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        if (valid) {
          setloading(true)
      const fd = new FormData();
      fd.append('societe_id',1);
      fd.append('image',photo);
      fd.append('titre',value.Titre);
      fd.append('description',value.description);
      
      axios.post('/api/service/update_service/'+props.match.params.id+"?_method=PUT",fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
     })
     .catch(error => {
         console.log(error)
     });     
    }else{
      message.error('Image must smaller than 2MB!');
    }  
      }
      }
      initialValues={{
         Titre: Titre,
         description:description,
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
              <Form.Label>Description</Form.Label>
              <InputGroup hasValidation>
               
               
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.description}
                </Form.Control.Feedback>
              </InputGroup>
              <textarea
                  type="text"
                  placeholder="description"
                  
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={touched.description && !!errors.description}
                />
            </Form.Group>
          </Form.Row>
         
       

          <Form.Group>
            
          
          <Upload 
             maxCount={1}
          {...propss}
          
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
           
          </Form.Group>
          <Button type="submit">Envoyer</Button>
  
         
          
        </Form>
       
      </Space>

      )}
    </Formik></>}</div>
  );
}


export default Modifservice;
