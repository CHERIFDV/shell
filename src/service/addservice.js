

import { Button, } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { notification, message,Space,Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './addservice.scss';
import { useState } from 'react';
import axios from'axios';
import LoadingPage from "../loading/LoadingPage";

const schema = yup.object().shape({
  Titre: yup.string().required(),
  description: yup.string().required(),
  
});


function Addservice() {

  const [photo,setphoto]=useState();
  const [valid,setvalid]=useState(true);
  const [imageUrl,setimageUrl]=useState();
  const [loading,setloading]=useState(false);
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
 
   const props = {
    onRemove: file => {
      setimageUrl(null)
      setphoto(null)
      setvalid(false)
    },
    beforeUpload: file => {
      return false;
    },
    photo,
  }; 
   
  return (<>{loading?<LoadingPage/> :<></>}
    <Formik 
      validationSchema={schema}
      onSubmit={(value,{resetForm})=>{
        setloading(true)
        if (valid) {
      const fd = new FormData();
      fd.append('societe_id',1);
      fd.append('image',photo);
      fd.append('titre',value.Titre);
      fd.append('description',value.description);
      fd.append('societe_id',1);
      axios.post('/api/service/add_service',fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
       console.log(response)
       notification['success']({
        message: "success",
        description:
          'This is the content of the notification.',
      });
      
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
      setloading(false)
      message.error('Image must smaller than 2MB!');
    }   
      console.log(value)
      }
      }
      initialValues={{
         Titre: "",
         description: '',
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
        <form className="ajoute" noValidate onSubmit={handleSubmit}>
         
          <div>
            <div controlId="validationFormik101">
              <span>Titre</span>
              <input
                type="text"
                name="Titre"
                value={values.Titre}
                onChange={handleChange}
                isValid={touched.Titre && !errors.Titre}
                isInvalid={touched.Titre && !!errors.Titre}
              />
               <p type="invalid" tooltip>
                  {errors.Titre}
                </p>
            </div>
    
            <div  controlId="validationFormikUsername2">
              <span>DESCRIPTION</span>
              <div hasValidation>
                <textarea
                  type="text"
                  placeholder="description"
                  aria-describedby="inputGroupPrepend"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={touched.description && !!errors.description}
                />
                <p type="invalid" tooltip>
                  {errors.description}
                </p>
              </div>
            </div>
          </div>
         
       

          <div>
            
          
          <Upload 
             maxCount={1}
          {...props}
          onChange={handleChangep}>
          <Button icon={<UploadOutlined />}>selectionner une image</Button>
        </Upload>
           
          </div>
          <Button type="submit">Envoyer</Button>
  
         
          
        </form>
       
      </Space>

      )}
    </Formik></>
  );
}


export default Addservice;
