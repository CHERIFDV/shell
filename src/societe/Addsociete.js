

import { Button,form,Card,div } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { notification, message,Space,Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import LoadingPage from "../loading/LoadingPage";
import { useState } from 'react';
import axios from'axios';


const schema = yup.object().shape({
  nom: yup.string().required(),
  addrue: yup.string().required(),
  addloc: yup.string().required(),
  codepostal: yup.string().required(),
  gsm1: yup.string().required(),
  gsm2: yup.string().required(),
  email: yup.string().required(),
  mf: yup.string().required(),
  rib: yup.string().required(),
  timbre: yup.number().required(),
  
});


function Addsociete() {

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
        if (valid) {
          setloading(true)
      const fd = new FormData();
      fd.append('name',value.nom);
      fd.append('logo',photo);
      fd.append('adresseRue',value.addrue);
      fd.append('adresseLoc',value.addloc);
      fd.append('adresseCodePostal',value.codepostal);
      fd.append('GSM1',value.gsm1);
      fd.append('GSM2',value.gsm2);
      fd.append('email',value.email);
      fd.append('MF',value.mf);
      fd.append('RIB',value.rib);
      fd.append('timbre',value.timbre);
      axios.post('/api/societe/add_societe',fd,{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }})
      .then(response => { 
        setloading(false)
        resetForm({values:""})
   
       notification[response.type]({
        message: response.type,
        description:
        response.message,
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
      message.error('Image must smaller than 2MB!');
    }   
      console.log(value)
      }
      }
      initialValues={{
        nom: '',
        addrue: '',
        addloc: '',
        codepostal: '',
        gsm1: '',
        gsm2: '',
        email: '',
        mf: '',
        rib: '',
        timbre:0,
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
              <span>NOM DE SOCIETE</span>
              <input
                type="text"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                isValid={touched.nom && !errors.nom}
                isInvalid={touched.nom && !!errors.nom}
              />
               <p type="invalid" tooltip>
                  {errors.nom}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Address rue</span>
              <input
                type="text"
                name="addrue"
                value={values.addrue}
                onChange={handleChange}
                isValid={touched.addrue && !errors.addrue}
                isInvalid={touched.addrue && !!errors.addrue}
              />
               <p type="invalid" tooltip>
                  {errors.addrue}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Address locale</span>
              <input
                type="text"
                name="addloc"
                value={values.addloc}
                onChange={handleChange}
                isValid={touched.addloc && !errors.addloc}
                isInvalid={touched.addloc && !!errors.addloc}
              />
               <p type="invalid" tooltip>
                  {errors.addloc}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Code Postale</span>
              <input
                type="number"
                name="codepostal"
                value={values.codepostal}
                onChange={handleChange}
                isValid={touched.codepostal && !errors.codepostal}
                isInvalid={touched.codepostal && !!errors.codepostal}
              />
               <p type="invalid" tooltip>
                  {errors.codepostal}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>GSM 1</span>
              <input
                type="number"
                name="gsm1"
                value={values.gsm1}
                onChange={handleChange}
                isValid={touched.gsm1 && !errors.gsm1}
                isInvalid={touched.gsm1 && !!errors.gsm1}
              />
               <p type="invalid" tooltip>
                  {errors.gsm1}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>GSM 2</span>
              <input
                type="number"
                name="gsm2"
                value={values.gsm2}
                onChange={handleChange}
                isValid={touched.gsm2 && !errors.gsm2}
                isInvalid={touched.gsm2 && !!errors.gsm2}
              />
               <p type="invalid" tooltip>
                  {errors.gsm2}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
              />
               <p type="invalid" tooltip>
                  {errors.email}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>MF</span>
              <input
                type="text"
                name="mf"
                value={values.mf}
                onChange={handleChange}
                isValid={touched.mf && !errors.mf}
                isInvalid={touched.mf && !!errors.mf}
              />
               <p type="invalid" tooltip>
                  {errors.mf}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>RIB</span>
              <input
                type="NUMBER"
                name="rib"
                value={values.rib}
                onChange={handleChange}
                isValid={touched.rib && !errors.rib}
                isInvalid={touched.rib && !!errors.rib}
              />
               <p type="invalid" tooltip>
                  {errors.rib}
                </p>
            </div>
            <div controlId="validationFormik101">
              <span>Timbre</span>
              <input
                type="NUMBER"
                name="timbre"
                value={values.timbre}
                onChange={handleChange}
                isValid={touched.timbre && !errors.timbre}
                isInvalid={touched.timbre && !!errors.timbre}
              />
               <p type="invalid" tooltip>
                  {errors.timbre}
                </p>
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


export default Addsociete;
